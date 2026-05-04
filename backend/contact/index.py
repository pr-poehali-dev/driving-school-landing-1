"""
Обработка заявок с сайта автошколы «Время рулить».
Принимает имя и телефон, отправляет письмо на timedrive92@mail.ru.
Версия 3.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors_headers, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    is_svo = body.get('isSVO', False)
    utm_source = body.get('utm_source', '')
    utm_medium = body.get('utm_medium', '')
    utm_campaign = body.get('utm_campaign', '')

    if not phone:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Phone required'})}

    smtp_email = os.environ.get('SMTP_EMAIL', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    to_email = 'timedrive92@mail.ru'

    svo_text = '✅ ДА — применить скидку 5 000 ₽' if is_svo else 'Нет'
    utm_text = f'\n\nИсточник: {utm_source or "прямой вход"}' + (f' / {utm_medium}' if utm_medium else '') + (f' / {utm_campaign}' if utm_campaign else '')
    now = datetime.now().strftime('%d.%m.%Y %H:%M')

    html_body = f"""
    <h2 style="color:#1E2A3E;font-family:Arial,sans-serif;">🚗 Новая заявка с сайта — Автошкола «Время рулить»</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px;">
      <tr><td style="padding:6px 12px;color:#666;">Дата и время:</td><td style="padding:6px 12px;font-weight:bold;">{now}</td></tr>
      <tr style="background:#f5f7fa;"><td style="padding:6px 12px;color:#666;">Имя:</td><td style="padding:6px 12px;font-weight:bold;">{name or '(не указано)'}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;">Телефон:</td><td style="padding:6px 12px;font-weight:bold;color:#3B82F6;">{phone}</td></tr>
      <tr style="background:#f5f7fa;"><td style="padding:6px 12px;color:#666;">Участник СВО:</td><td style="padding:6px 12px;">{svo_text}</td></tr>
      <tr><td style="padding:6px 12px;color:#666;">Источник:</td><td style="padding:6px 12px;">{utm_source or 'прямой вход'}{(' / ' + utm_medium) if utm_medium else ''}{(' / ' + utm_campaign) if utm_campaign else ''}</td></tr>
    </table>
    <p style="margin-top:16px;color:#666;font-family:Arial,sans-serif;font-size:13px;">Перезвоните клиенту в течение 20 минут!</p>
    """

    if smtp_email and smtp_password:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'🚗 Новая заявка: {name or phone} — Время рулить'
        msg['From'] = smtp_email
        msg['To'] = to_email
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))

        with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
            server.login(smtp_email, smtp_password)
            server.sendmail(smtp_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'message': 'Заявка принята'}),
    }