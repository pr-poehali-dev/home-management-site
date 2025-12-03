import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    '''
    Создает подключение к базе данных
    '''
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления новостями (получение списка, добавление, удаление)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с request_id
    Returns: HTTP response dict с новостями или результатом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            tag = params.get('tag')
            
            if tag and tag != 'Все':
                cursor.execute(
                    "SELECT id, title, content, tag, TO_CHAR(published_date, 'DD Month YYYY') as date "
                    "FROM news WHERE tag = %s ORDER BY published_date DESC",
                    (tag,)
                )
            else:
                cursor.execute(
                    "SELECT id, title, content, tag, TO_CHAR(published_date, 'DD Month YYYY') as date "
                    "FROM news ORDER BY published_date DESC"
                )
            
            news = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'news': news}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            headers = event.get('headers', {})
            admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
            
            if not admin_key or admin_key != 'admin123':
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Доступ запрещен'}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title')
            content = body_data.get('content')
            tag = body_data.get('tag')
            
            if not title or not content or not tag:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Необходимы поля: title, content, tag'}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO news (title, content, tag) VALUES (%s, %s, %s) RETURNING id",
                (title, content, tag)
            )
            news_id = cursor.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': news_id, 'message': 'Новость добавлена'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            headers = event.get('headers', {})
            admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
            
            if not admin_key or admin_key != 'admin123':
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Доступ запрещен'}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            params = event.get('queryStringParameters') or {}
            news_id = params.get('id')
            
            if not news_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Необходим параметр id'}, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            cursor.execute("DELETE FROM news WHERE id = %s", (news_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Новость удалена'}, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}, ensure_ascii=False),
            'isBase64Encoded': False
        }
    finally:
        cursor.close()
        conn.close()
