import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all feedback submissions from database
    Args: event with httpMethod, optional query params for filtering
    Returns: HTTP response with list of feedbacks
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
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    query_params = event.get('queryStringParameters', {}) or {}
    status_filter = query_params.get('status')
    limit = int(query_params.get('limit', '100'))
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if status_filter:
            cur.execute(
                "SELECT id, name, phone, message, created_at, status, notes FROM t_p71212982_home_management_site.feedback WHERE status = %s ORDER BY created_at DESC LIMIT %s",
                (status_filter, limit)
            )
        else:
            cur.execute(
                "SELECT id, name, phone, message, created_at, status, notes FROM t_p71212982_home_management_site.feedback ORDER BY created_at DESC LIMIT %s",
                (limit,)
            )
        
        rows = cur.fetchall()
        
        feedbacks = []
        for row in rows:
            feedbacks.append({
                'id': row[0],
                'name': row[1],
                'phone': row[2],
                'message': row[3],
                'created_at': row[4].isoformat() if row[4] else None,
                'status': row[5],
                'notes': row[6]
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'count': len(feedbacks),
                'feedbacks': feedbacks
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': f'Database error: {str(e)}'
            }),
            'isBase64Encoded': False
        }
