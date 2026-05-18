"""
Admin API: аутентификация + управление контентом всех секций сайта.
POST /auth/login          — вход, возвращает JWT
POST /auth/verify         — проверка токена
POST /auth/change-password — смена пароля

GET  /content/sections         — список секций
GET  /content/section/{name}   — получить данные секции (публично)
PUT  /content/section/{name}   — сохранить секцию (авторизация)
POST /content/section/{name}/reset — сброс к дефолту
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

DEFAULT_CONTENT = {
    'hero': {
        'heading': 'АВТОШКОЛА, КОТОРУЮ СОЗДАЛИ ИНСТРУКТОРЫ, А НЕ МАРКЕТОЛОГИ',
        'subheading': 'Хватит покупать обещания. Мы учим только тому, что работает. Выбирайте опыт, а не слова.',
        'banner_image': 'https://cdn.poehali.dev/files/0c988d32-7078-44aa-a34e-785eef83e869.jpg',
        'cta_button': 'НАЧАТЬ ДВИЖЕНИЕ',
    },
    'header': {
        'phone': '+7 978 502 11 13',
        'address': 'Севастополь · ул. Хрусталева, 177А',
        'logo_url': 'https://cdn.poehali.dev/files/b89f6099-f142-4b1d-ba8f-ffb70486bbc0.png',
    },
    'footer': {
        'phone': '+7 978 502 11 13',
        'email': 'timedrive92@mail.ru',
        'address_office': 'ул. Хрусталева, 177А, ТЦ «Одиз»',
        'address_autodrome': 'ул. Стахановцев, 18',
        'hours': 'Пн–Пт 10:00–18:00',
        'vk_url': 'https://vk.com/vremyarulit',
        'telegram_url': 'https://t.me/vremyarulit',
        'company_name': 'ООО «ВРЕМЯ РУЛИТЬ»',
        'inn': '9200026796',
        'ogrn': '1253200001169',
    },
    'pricing': {
        'price': '64 000',
        'old_price': '75 000',
        'discount': '-11 000',
        'includes': 'Теория + практика + топливо + подача в ГИБДД',
        'svo_discount': '5 000',
        'installment_first': '15 000',
        'features': [
            {'icon': 'Fuel', 'text': 'Топливо включено — никаких доплат'},
            {'icon': 'CreditCard', 'text': 'Рассрочка без банков — первый взнос 15 000 ₽'},
            {'icon': 'Clock', 'text': 'Дополнительные часы по необходимости'},
            {'icon': 'Shield', 'text': 'Скидка 5 000 ₽ для участников СВО'},
        ],
    },
    'advantages': {
        'checklist': [
            '58 часов практики с топливом в стоимости',
            'МКПП или АКПП — выбираете сами',
            'Собственный автодром без очередей',
            'Рассрочка без банков — первый взнос 15 000 ₽',
            'Инструктор-женщина — по запросу',
            'Никаких скрытых платежей и липовых пересдач',
        ],
        'cars_manual': 'LADA VESTA, LADA GRANTA, Renault Logan',
        'cars_auto': 'KIA CEED, Chevrolet Aveo, Hyundai Solaris',
        'stats': [
            {'value': '58', 'label': 'часов практики с топливом'},
            {'value': '5', 'label': 'инструкторов-основателей'},
            {'value': '64 000', 'label': '₽ полный курс, всё включено'},
            {'value': '10', 'label': 'минут до автодрома'},
        ],
    },
    'pain_points': {
        'items': [
            {'title': 'Инструктор орёт и нервничает', 'description': 'У нас спокойное обучение. Никаких криков — только терпение и чёткие объяснения.'},
            {'title': 'Разводят на доплаты', 'description': 'Фиксированная цена 64 000 ₽ с топливом. Всё включено с первого дня.'},
            {'title': 'Автодром на другом конце города', 'description': 'Наш автодром — ул. Стахановцев, 18. Удобно и без очередей.'},
            {'title': 'Стесняюсь инструктора-мужчины', 'description': 'У нас есть инструктор-женщина. Выберите комфортный вариант.'},
        ],
    },
    'triggers': {
        'items': [
            {
                'badge': 'По запросу',
                'title': 'Инструктор-женщина',
                'description': 'Ирина Дарчич — 8 лет опыта. Спокойно, без спешки, без оценок.',
                'image': 'https://cdn.poehali.dev/files/2937ba8a-51cb-4747-bf73-be0fcc7f1c6a.jpg',
            },
            {
                'badge': 'Скидка −5 000 ₽',
                'title': 'Участникам СВО',
                'description': 'Подтверждается документом. Скидка применяется автоматически.',
                'image': '',
            },
        ],
    },
    'map': {
        'address_office': 'Севастополь, ул. Хрусталева, 177А, ТЦ «Адиз»',
        'address_autodrome': 'Севастополь, ул. Стахановцев, 18',
        'hours_weekdays': 'Пн–Пт 10:00–18:00 (обед 13:00–14:00)',
        'hours_weekend': 'Сб–Вс по записи',
        'phone': '+7 978 502 11 13',
    },
    'instructors': {
        'items': [
            {'id': 1, 'name': 'Ридван Шамсудинов', 'years': '15', 'spec': 'Основатель · Городское вождение', 'quote': 'Я сам инструктор. Я знаю, как учат в других школах — и знаю, как надо. Поэтому открыл свою.', 'photo': 'https://cdn.poehali.dev/files/c97d13a4-dac4-46df-b994-94a251935c4d.jpg', 'photo_position': 'center top', 'advantage': ''},
            {'id': 2, 'name': 'Ирина Дарчич', 'years': '8', 'spec': 'Инструктор-женщина · Новички', 'quote': 'Со мной не страшно. Спокойно, без спешки, без оценок — просто учимся ехать.', 'photo': 'https://cdn.poehali.dev/files/2937ba8a-51cb-4747-bf73-be0fcc7f1c6a.jpg', 'photo_position': 'center top', 'advantage': ''},
            {'id': 3, 'name': 'Дмитрий Дарчич', 'years': '18', 'spec': 'Сложные манёвры · МКПП', 'quote': 'Механика — не страшно, если объяснить правильно. За 18 лет я научил этому сотни людей.', 'photo': 'https://cdn.poehali.dev/files/3a58eaf4-a04b-4f47-8af1-15c4eaed2862.jpg', 'photo_position': 'center top', 'advantage': ''},
            {'id': 4, 'name': 'Эльдар Музафаров', 'years': '10', 'spec': 'Подготовка к экзамену', 'quote': 'Экзамен в ГИБДД — это не лотерея, если готовиться правильно. Я знаю маршруты и знаю систему.', 'photo': 'https://cdn.poehali.dev/files/50cf5106-21c3-4232-993a-1ad028250a52.jpg', 'photo_position': 'center top', 'advantage': ''},
            {'id': 5, 'name': 'Ферат Аблялимов', 'years': '9', 'spec': 'Высшее · Техник-механик · с 2016 г.', 'quote': 'Мне нравится видеть эмоции людей, когда у них получается управлять автомобилем. И особенно — когда они получают права.', 'photo': 'https://cdn.poehali.dev/files/763fb878-ad01-4aed-b0de-312d528df7a0.jpg', 'photo_position': '75% top', 'advantage': 'Создаёт доверительную приятную обстановку, поддерживает как друга'},
        ],
    },
    'reviews': {
        'items': [
            {'id': 1, 'author_name': 'Анна', 'author_age': 34, 'rating': 5, 'text': 'Очень боялась учиться вождению. Выбрала инструктора-женщину — и не пожалела. Ирина объясняла всё спокойно, без спешки. Сдала с первого раза!'},
            {'id': 2, 'author_name': 'Дмитрий', 'author_age': 22, 'rating': 5, 'text': 'Учился в другой школе — бросил. Здесь совсем другой подход: не просто катаешься по маршруту, а реально разбираешь каждую ситуацию. Чувствуется, что инструктору не всё равно.'},
            {'id': 3, 'author_name': 'Екатерина', 'author_age': 29, 'rating': 5, 'text': 'Понравился свой автодром — не нужно ждать в очереди. Рассрочка без банков очень выручила. Рекомендую всем знакомым.'},
        ],
    },
    'faq': {
        'items': [
            {'id': 1, 'question': 'Сколько длится обучение?', 'answer': 'Стандартный курс — 2,5 месяца. Если занимаетесь интенсивно — можно быстрее.'},
            {'id': 2, 'question': 'Нужна ли медкомиссия?', 'answer': 'Да, медицинскую справку нужно получить до начала вождения. Мы подскажем, где это сделать быстро.'},
            {'id': 3, 'question': 'Что входит в стоимость 64 000 ₽?', 'answer': 'Всё: теория, вождение, топливо, подача документов в ГИБДД. Никаких скрытых платежей.'},
            {'id': 4, 'question': 'Можно ли учиться на автомате?', 'answer': 'Да. У нас есть автомобили и на МКПП, и на АКПП — выбираете сами.'},
            {'id': 5, 'question': 'Что если не сдам с первого раза?', 'answer': 'Мы проводим дополнительные занятия бесплатно, пока не сдадите. Это входит в договор.'},
            {'id': 6, 'question': 'Есть ли рассрочка?', 'answer': 'Да, без банков и переплат. Первый взнос — 15 000 ₽, остальное по договорённости.'},
            {'id': 7, 'question': 'Можно выбрать инструктора?', 'answer': 'Конечно. Можно выбрать инструктора-женщину — по запросу.'},
            {'id': 8, 'question': 'Где автодром?', 'answer': 'Наш собственный автодром — ул. Стахановцев, 18. Никаких очередей с чужими.'},
            {'id': 9, 'question': 'Есть ли бесплатные занятия?', 'answer': 'Да: первое занятие по теории — бесплатно, и первая неделя онлайн-теории тоже.'},
        ],
    },
    'price_comparison': {
        'items': [
            {'feature': 'Базовая цена курса', 'competitor': '39 900 ₽', 'ours': '64 000 ₽'},
            {'feature': 'Топливо / износ авто', 'competitor': '+8 000 ₽', 'ours': '0 ₽'},
            {'feature': 'Пересдача теории', 'competitor': '+1 500 ₽', 'ours': '0 ₽'},
            {'feature': 'Вождение (3 пересдачи)', 'competitor': '+9 000 ₽', 'ours': '0 ₽'},
            {'feature': 'Своё расписание', 'competitor': '+5 000 ₽', 'ours': '0 ₽'},
            {'feature': 'Подготовка документов', 'competitor': '+2 000 ₽', 'ours': '0 ₽'},
        ],
        'competitor_total': '~65 400 ₽',
        'our_total': '64 000 ₽',
    },
}

VALID_SECTIONS = list(DEFAULT_CONTENT.keys())


def get_s3():
    return boto3.client('s3', endpoint_url='https://bucket.poehali.dev',
                        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])


def hash_password(password: str) -> str:
    salt = os.environ.get('ADMIN_JWT_SECRET', 'salt')[:16]
    return hashlib.sha256(f"{salt}{password}".encode()).hexdigest()


def make_jwt(payload: dict) -> str:
    secret = os.environ.get('ADMIN_JWT_SECRET', 'fallback-secret-change-me')
    header = base64.urlsafe_b64encode(json.dumps({'alg': 'HS256', 'typ': 'JWT'}).encode()).decode().rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(json.dumps(payload).encode()).decode().rstrip('=')
    sig_input = f"{header}.{payload_b64}"
    sig = hmac.new(secret.encode(), sig_input.encode(), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode().rstrip('=')
    return f"{sig_input}.{sig_b64}"


def verify_jwt(token: str):
    try:
        secret = os.environ.get('ADMIN_JWT_SECRET', 'fallback-secret-change-me')
        parts = token.split('.')
        if len(parts) != 3:
            return None
        sig_input = f"{parts[0]}.{parts[1]}"
        expected_sig = hmac.new(secret.encode(), sig_input.encode(), hashlib.sha256).digest()
        expected_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')
        if not hmac.compare_digest(parts[2], expected_b64):
            return None
        padding = 4 - len(parts[1]) % 4
        payload = json.loads(base64.urlsafe_b64decode(parts[1] + '=' * padding))
        if payload.get('exp', 0) < time.time():
            return None
        return payload
    except Exception:
        return None


def verify_token(event: dict) -> bool:
    auth = event.get('headers', {}).get('X-Authorization', '') or event.get('headers', {}).get('Authorization', '')
    token = auth.replace('Bearer ', '').strip()
    return bool(verify_jwt(token)) if token else False


def s3_get_json(s3, key: str, default):
    try:
        obj = s3.get_object(Bucket='files', Key=key)
        return json.loads(obj['Body'].read())
    except Exception:
        return default


def s3_put_json(s3, key: str, data):
    s3.put_object(Bucket='files', Key=key,
                  Body=json.dumps(data, ensure_ascii=False, indent=2),
                  ContentType='application/json')


def json_response(data, status=200):
    return {'statusCode': status, 'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
            'body': json.dumps(data, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    path = event.get('path', '/')
    method = event.get('httpMethod', 'GET')
    s3 = get_s3()

    body = {}
    if event.get('body'):
        try:
            body = json.loads(event['body'])
        except Exception:
            pass

    # ========== AUTH ==========

    if '/auth/login' in path and method == 'POST':
        email = body.get('email', '').strip().lower()
        password = body.get('password', '')
        if not email or not password:
            return json_response({'error': 'Email и пароль обязательны'}, 400)
        auth_data = s3_get_json(s3, 'admin/auth.json', {'password_hash': hash_password('admin123'), 'email': 'admin@vremya-rulit.ru'})
        if hash_password(password) != auth_data.get('password_hash', ''):
            return json_response({'error': 'Неверный email или пароль'}, 401)
        token = make_jwt({'email': email, 'role': 'admin', 'exp': int(time.time()) + 86400 * 7})
        return json_response({'token': token, 'email': email, 'role': 'admin'})

    if '/auth/verify' in path and method == 'POST':
        auth = event.get('headers', {}).get('X-Authorization', '') or event.get('headers', {}).get('Authorization', '')
        token = auth.replace('Bearer ', '').strip()
        payload = verify_jwt(token) if token else None
        if not payload:
            return json_response({'error': 'Токен недействителен'}, 401)
        return json_response({'valid': True, 'email': payload.get('email'), 'role': payload.get('role')})

    if '/auth/change-password' in path and method == 'POST':
        if not verify_token(event):
            return json_response({'error': 'Не авторизован'}, 401)
        new_password = body.get('new_password', '')
        if len(new_password) < 6:
            return json_response({'error': 'Минимум 6 символов'}, 400)
        s3_put_json(s3, 'admin/auth.json', {'password_hash': hash_password(new_password), 'email': body.get('email', 'admin@vremya-rulit.ru')})
        return json_response({'success': True})

    # ========== CONTENT ==========

    if '/content/sections' in path and method == 'GET':
        return json_response({'sections': VALID_SECTIONS})

    if '/content/section/' in path:
        parts = path.split('/content/section/')
        section_part = parts[-1].strip('/') if len(parts) > 1 else ''
        is_reset = section_part.endswith('/reset')
        section = section_part.replace('/reset', '').strip('/')

        if section not in VALID_SECTIONS:
            return json_response({'error': f'Секция не найдена: {section}'}, 404)

        if method == 'GET':
            data = s3_get_json(s3, f'admin/content/{section}.json', DEFAULT_CONTENT[section])
            return json_response({'section': section, 'data': data})

        if method == 'PUT':
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            body['_updated_at'] = int(time.time())
            s3_put_json(s3, f'admin/content/{section}.json', body)
            return json_response({'success': True, 'section': section})

        if method == 'POST' and is_reset:
            if not verify_token(event):
                return json_response({'error': 'Не авторизован'}, 401)
            default = DEFAULT_CONTENT[section]
            s3_put_json(s3, f'admin/content/{section}.json', default)
            return json_response({'success': True, 'section': section, 'data': default})

    return json_response({'error': 'Маршрут не найден'}, 404)
