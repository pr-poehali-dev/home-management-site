"""
Обновляет документы компании (лицензию или свидетельство о регистрации).
Принимает company_id и URL документа через POST запрос.
Сохраняет информацию о документе в S3.
"""
import json
import os
import boto3
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    company_id = body_data.get('company_id', '')
    
    if not company_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'company_id is required'}),
            'isBase64Encoded': False
        }
    
    s3 = boto3.client('s3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    
    # Обновляем документы если они переданы
    if 'license' in body_data:
        key = f'companies/{company_id}/license.json'
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=json.dumps({'url': body_data['license']}),
            ContentType='application/json'
        )
    
    if 'registration' in body_data:
        key = f'companies/{company_id}/registration.json'
        s3.put_object(
            Bucket='files',
            Key=key,
            Body=json.dumps({'url': body_data['registration']}),
            ContentType='application/json'
        )
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False
    }
