"""
Общие утилиты для admin-функций: CORS, JWT, S3, JSON.
Один и тот же файл лежит в backend/admin-api и backend/admin-files,
потому что Cloud Functions деплоятся независимо.
При изменении — синхронизировать оба файла.
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


def get_s3():
    return boto3.client('s3', endpoint_url='https://bucket.poehali.dev',
                        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])


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
