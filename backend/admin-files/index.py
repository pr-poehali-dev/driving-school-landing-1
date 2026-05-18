"""
Admin Files: SEO управление + медиатека.
GET  /seo/meta?page=/          — SEO настройки страницы
PUT  /seo/meta?page=/          — сохранить SEO
GET  /seo/public?page=/        — публичные SEO-настройки страницы (для фронта)
GET  /seo/redirects            — список редиректов
POST /seo/redirects            — добавить редирект
DELETE /seo/redirects?id=123   — удалить редирект
GET  /seo/robots               — robots.txt
PUT  /seo/robots               — обновить robots.txt
GET  /seo/sitemap              — настройки sitemap
PUT  /seo/sitemap              — обновить sitemap
GET  /seo/audit                — SEO аудит всех страниц

POST /media/upload             — загрузить файл (base64)
GET  /media/list               — список файлов
PUT  /media/file               — обновить alt/tags
DELETE /media/file             — удалить файл
"""
import json
import os
import time
import hmac
import hashlib
import base64
import boto3

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Authorization',
}

DEFAULT_PAGES_SEO = {
    '/': {
        'title': 'Автошкола Время Рулить Севастополь — обучение вождению от 64 000 ₽',
        'description': 'Автошкола в Севастополе. Опытные инструкторы, свой автодром, инструктор-женщина, рассрочка без банков. Стоимость курса 64 000 ₽ с топливом.',
        'keywords': 'автошкола севастополь, обучение вождению, права севастополь, инструктор женщина',
        'og_title': 'Автошкола Время Рулить — лучшая автошкола Севастополя',
        'og_description': 'Учим вождению честно. Цена 64 000 ₽ с топливом. Свой автодром. Инструктор-женщина.',
        'og_image': 'https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg',
        'canonical': 'https://vremya-rulit.ru/',
        'favicon': '/favicon.ico',
        'robots': 'index, follow',
        'h1': 'АВТОШКОЛА, КОТОРУЮ СОЗДАЛИ ИНСТРУКТОРЫ, А НЕ МАРКЕТОЛОГИ',
        'json_ld': '{"@context":"https://schema.org","@type":"DrivingSchool","name":"Автошкола Время Рулить","url":"https://vremya-rulit.ru","telephone":"+79785021113"}',
    },
    '/privacy': {'title': 'Политика конфиденциальности — Время Рулить', 'robots': 'noindex, follow', 'favicon': '/favicon.ico'},
    '/agreement': {'title': 'Согласие на обработку ПД — Время Рулить', 'robots': 'noindex, follow', 'favicon': '/favicon.ico'},
    '/requisites': {'title': 'Реквизиты — ООО Время Рулить', 'robots': 'noindex, follow', 'favicon': '/favicon.ico'},
    '/cookies': {'title': 'Политика cookie — Время Рулить', 'robots': 'noindex, follow', 'favicon': '/favicon.ico'},
    '/terms': {'title': 'Пользовательское соглашение — Время Рулить', 'robots': 'noindex, follow', 'favicon': '/favicon.ico'},
}

DEFAULT_ROBOTS = "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/*\n\nSitemap: https://vremya-rulit.ru/sitemap.xml\n"

ALLOWED_MIME = {
    'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif',
    'image/webp': '.webp', 'image/svg+xml': '.svg', 'image/avif': '.avif',
    'application/pdf': '.pdf',
}


def get_s3():
    return boto3.client('s3', endpoint_url='https://bucket.poehali.dev',
                        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])


def verify_token(event: dict) -> bool:
    auth = event.get('headers', {}).get('X-Authorization', '') or event.get('headers', {}).get('Authorization', '')
    token = auth.replace('Bearer ', '').strip()
    if not token:
        return False
    try:
        secret = os.environ.get('ADMIN_JWT_SECRET', 'fallback-secret-change-me')
        parts = token.split('.')
        if len(parts) != 3:
            return False
        sig_input = f"{parts[0]}.{parts[1]}"
        expected_sig = hmac.new(secret.encode(), sig_input.encode(), hashlib.sha256).digest()
        expected_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')
        if not hmac.compare_digest(parts[2], expected_b64):
            return False
        padding = 4 - len(parts[1]) % 4
        payload = json.loads(base64.urlsafe_b64decode(parts[1] + '=' * padding))
        return payload.get('exp', 0) >= time.time()
    except Exception:
        return False


def json_response(data, status=200):
    return {'statusCode': status, 'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps(data, ensure_ascii=False)}


def s3_get_json(s3, key, default):
    try:
        obj = s3.get_object(Bucket='files', Key=key)
        return json.loads(obj['Body'].read())
    except Exception:
        return default


def s3_put_json(s3, key, data):
    s3.put_object(Bucket='files', Key=key,
                  Body=json.dumps(data, ensure_ascii=False, indent=2),
                  ContentType='application/json')


def seo_audit(seo: dict, page: str) -> dict:
    issues, score = [], 100
    title = seo.get('title', '')
    desc = seo.get('description', '')
    if not title:
        issues.append('Нет title'); score -= 30
    elif len(title) > 70:
        issues.append(f'Title длинный ({len(title)} симв.)'); score -= 10
    elif len(title) < 30:
        issues.append(f'Title короткий ({len(title)} симв.)'); score -= 10
    if not desc:
        issues.append('Нет description'); score -= 20
    elif len(desc) > 160:
        issues.append(f'Description длинный ({len(desc)} симв.)'); score -= 5
    elif len(desc) < 100:
        issues.append(f'Description короткий ({len(desc)} симв.)'); score -= 5
    if not seo.get('og_image'):
        issues.append('Нет OG Image'); score -= 10
    if not seo.get('canonical'):
        issues.append('Нет canonical URL'); score -= 5
    return {'page': page, 'score': max(0, score), 'issues': issues,
            'title_len': len(title), 'desc_len': len(desc)}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    path = event.get('path', '/')
    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    s3 = get_s3()

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    # ========== SEO ==========

    if '/seo/public' in path and method == 'GET':
        page = params.get('page', '/')
        all_seo = s3_get_json(s3, 'admin/seo/pages.json', DEFAULT_PAGES_SEO)
        page_seo = all_seo.get(page, DEFAULT_PAGES_SEO.get(page, {}))
        # Возвращаем только публичные поля (без _updated_at и пр.)
        public_fields = ['title', 'description', 'keywords', 'og_title', 'og_description',
                         'og_image', 'canonical', 'robots', 'h1', 'json_ld', 'favicon']
        clean = {k: page_seo.get(k, '') for k in public_fields if page_seo.get(k)}
        return json_response({'page': page, 'seo': clean})

    if '/seo/meta' in path:
        page = params.get('page', '/')
        all_seo = s3_get_json(s3, 'admin/seo/pages.json', DEFAULT_PAGES_SEO)

        if method == 'GET':
            page_seo = all_seo.get(page, DEFAULT_PAGES_SEO.get(page, {}))
            audit = seo_audit(page_seo, page)
            pages_list = list(all_seo.keys())
            return json_response({'page': page, 'seo': page_seo, 'audit': audit, 'all_pages': pages_list})

        if method == 'PUT':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            all_seo[page] = {**all_seo.get(page, {}), **body, '_updated_at': int(time.time())}
            s3_put_json(s3, 'admin/seo/pages.json', all_seo)
            return json_response({'success': True, 'page': page})

    if '/seo/redirects' in path:
        redirects = s3_get_json(s3, 'admin/seo/redirects.json', {'items': []})

        if method == 'GET':
            return json_response(redirects)

        if method == 'POST':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            item = {'id': int(time.time() * 1000), 'from': body.get('from', ''), 'to': body.get('to', ''),
                    'type': body.get('type', 301), 'active': True, 'created_at': int(time.time())}
            redirects['items'].append(item)
            s3_put_json(s3, 'admin/seo/redirects.json', redirects)
            return json_response({'success': True, 'redirect': item})

        if method == 'DELETE':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            rid = str(params.get('id', ''))
            redirects['items'] = [r for r in redirects['items'] if str(r['id']) != rid]
            s3_put_json(s3, 'admin/seo/redirects.json', redirects)
            return json_response({'success': True})

    if '/seo/robots' in path:
        if method == 'GET':
            try:
                obj = s3.get_object(Bucket='files', Key='admin/seo/robots.txt')
                content = obj['Body'].read().decode()
            except Exception:
                content = DEFAULT_ROBOTS
            return json_response({'content': content})
        if method == 'PUT':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            s3.put_object(Bucket='files', Key='admin/seo/robots.txt',
                          Body=body.get('content', DEFAULT_ROBOTS).encode(), ContentType='text/plain')
            return json_response({'success': True})

    if '/seo/sitemap' in path:
        default_sitemap = {'pages': [
            {'loc': 'https://vremya-rulit.ru/', 'priority': '1.0', 'changefreq': 'weekly'},
            {'loc': 'https://vremya-rulit.ru/privacy', 'priority': '0.3', 'changefreq': 'yearly'},
            {'loc': 'https://vremya-rulit.ru/agreement', 'priority': '0.3', 'changefreq': 'yearly'},
            {'loc': 'https://vremya-rulit.ru/requisites', 'priority': '0.3', 'changefreq': 'yearly'},
        ]}
        if method == 'GET':
            return json_response(s3_get_json(s3, 'admin/seo/sitemap.json', default_sitemap))
        if method == 'PUT':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            s3_put_json(s3, 'admin/seo/sitemap.json', body)
            return json_response({'success': True})

    if '/seo/audit' in path and method == 'GET':
        all_seo = s3_get_json(s3, 'admin/seo/pages.json', DEFAULT_PAGES_SEO)
        results = [seo_audit(seo, page) for page, seo in all_seo.items()]
        avg_score = sum(r['score'] for r in results) // len(results) if results else 0
        return json_response({'pages': results, 'avg_score': avg_score, 'total': len(results)})

    # ========== MEDIA ==========

    if '/media/upload' in path and method == 'POST':
        if not verify_token(event):
            return json_response({'error': 'Не авторизован'}, 401)

        file_data = body.get('file', '')
        mime_type = body.get('mime_type', 'image/jpeg')
        original_name = body.get('filename', 'file')
        folder = body.get('folder', 'uploads')
        alt_text = body.get('alt', '')

        if mime_type not in ALLOWED_MIME:
            return json_response({'error': f'Тип {mime_type} не поддерживается'}, 400)

        if ',' in file_data:
            file_data = file_data.split(',')[1]
        try:
            file_bytes = base64.b64decode(file_data)
        except Exception:
            return json_response({'error': 'Неверный base64'}, 400)

        if len(file_bytes) > 20 * 1024 * 1024:
            return json_response({'error': 'Файл больше 20 МБ'}, 400)

        ext = ALLOWED_MIME[mime_type]
        safe_name = ''.join(c if c.isalnum() or c in '-_' else '_' for c in original_name.rsplit('.', 1)[0])
        ts = int(time.time())
        key = f"admin/media/{folder}/{ts}_{safe_name}{ext}"

        s3.put_object(Bucket='files', Key=key, Body=file_bytes, ContentType=mime_type)
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

        # Обновляем индекс
        idx = s3_get_json(s3, 'admin/media/index.json', {'files': []})
        file_info = {'id': ts, 'key': key, 'filename': original_name, 'folder': folder,
                     'mime_type': mime_type, 'size_bytes': len(file_bytes),
                     'cdn_url': cdn_url, 'alt': alt_text, 'tags': [], 'created_at': ts}
        idx['files'].insert(0, file_info)
        idx['files'] = idx['files'][:500]
        s3_put_json(s3, 'admin/media/index.json', idx)

        return json_response({'success': True, 'file': file_info, 'url': cdn_url})

    if '/media/list' in path and method == 'GET':
        if not verify_token(event):
            return json_response({'error': 'Не авторизован'}, 401)
        folder = params.get('folder', '')
        search = params.get('search', '').lower()
        page = int(params.get('page', 1))
        per_page = int(params.get('per_page', 20))

        idx = s3_get_json(s3, 'admin/media/index.json', {'files': []})
        files = idx['files']
        if folder:
            files = [f for f in files if f.get('folder') == folder]
        if search:
            files = [f for f in files if search in f.get('filename', '').lower()
                     or search in f.get('alt', '').lower()
                     or any(search in str(t).lower() for t in f.get('tags', []))]

        total = len(files)
        start = (page - 1) * per_page
        return json_response({'files': files[start:start + per_page], 'total': total,
                               'page': page, 'pages': (total + per_page - 1) // per_page})

    if '/media/file' in path and method == 'PUT':
        if not verify_token(event):
            return json_response({'error': 'Не авторизован'}, 401)
        key = body.get('key', '')
        if not key or not key.startswith('admin/media/'):
            return json_response({'error': 'Неверный ключ'}, 400)
        new_alt = body.get('alt', None)
        new_tags = body.get('tags', None)
        idx = s3_get_json(s3, 'admin/media/index.json', {'files': []})
        updated = None
        for f in idx['files']:
            if f.get('key') == key:
                if new_alt is not None:
                    f['alt'] = new_alt
                if new_tags is not None:
                    f['tags'] = new_tags if isinstance(new_tags, list) else []
                updated = f
                break
        if not updated:
            return json_response({'error': 'Файл не найден в индексе'}, 404)
        s3_put_json(s3, 'admin/media/index.json', idx)
        return json_response({'success': True, 'file': updated})

    if '/media/file' in path and method == 'DELETE':
        if not verify_token(event):
            return json_response({'error': 'Не авторизован'}, 401)
        key = body.get('key', '') or params.get('key', '')
        if not key or not key.startswith('admin/media/'):
            return json_response({'error': 'Неверный ключ'}, 400)
        s3.delete_object(Bucket='files', Key=key)
        try:
            idx = s3_get_json(s3, 'admin/media/index.json', {'files': []})
            idx['files'] = [f for f in idx['files'] if f.get('key') != key]
            s3_put_json(s3, 'admin/media/index.json', idx)
        except Exception:
            pass
        return json_response({'success': True})

    return json_response({'error': 'Маршрут не найден'}, 404)