import json
import os
import psycopg2
from typing import Dict, Any
from pydantic import BaseModel, Field

class FeedbackUpdate(BaseModel):
    status: str = Field(..., pattern='^(new|in_progress|resolved)$')
    notes: str = Field(default='', max_length=1000)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Update feedback status and notes in database
    Args: event with httpMethod, pathParams containing feedback_id, body with status and notes
    Returns: HTTP response with updated feedback data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'PUT':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    path_params = event.get('pathParams', {}) or {}
    params = event.get('params', {}) or {}
    query_params = event.get('queryStringParameters', {}) or {}
    
    feedback_id = path_params.get('id') or params.get('id') or query_params.get('id')
    
    if not feedback_id:
        url = event.get('url', '')
        path_parts = url.split('/')
        if len(path_parts) > 0:
            feedback_id = path_parts[-1]
    
    if not feedback_id or not str(feedback_id).isdigit():
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Feedback ID is required'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    update_data = FeedbackUpdate(**body_data)
    
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
    
    try:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute(
            "UPDATE t_p71212982_home_management_site.feedback SET status = %s, notes = %s WHERE id = %s RETURNING id, name, phone, message, created_at, status, notes",
            (update_data.status, update_data.notes, feedback_id)
        )
        
        row = cur.fetchone()
        
        if not row:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Feedback not found'}),
                'isBase64Encoded': False
            }
        
        conn.commit()
        cur.close()
        conn.close()
        
        feedback = {
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'message': row[3],
            'created_at': row[4].isoformat() if row[4] else None,
            'status': row[5],
            'notes': row[6]
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'feedback': feedback
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