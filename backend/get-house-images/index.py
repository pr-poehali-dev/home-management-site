import json
import psycopg2
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получает загруженные изображения и документы для дома
    Args: event - dict с httpMethod, queryStringParameters (house_id)
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict с URL изображений и документов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters', {}) or {}
    house_id = params.get('house_id', '')
    
    if not house_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'house_id is required'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        cur.execute(
            "SELECT image, manager_photo, protocol_oss, management_agreement FROM houses WHERE id = %s",
            (house_id,)
        )
        result = cur.fetchone()
        
        if result:
            image_url, manager_photo_url, protocol_oss, management_agreement = result
            data = {
                'house_id': house_id,
                'image': image_url,
                'managerPhoto': manager_photo_url,
                'protocolOss': protocol_oss,
                'managementAgreement': management_agreement
            }
        else:
            data = {
                'house_id': house_id,
                'image': None,
                'managerPhoto': None,
                'protocolOss': None,
                'managementAgreement': None
            }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(data),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()