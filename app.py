#!/usr/bin/env python3
"""
Flask приложение для Render хостинга
Серверит статичные файлы галереи и API для синхронизации анимаций
"""

from flask import Flask, send_from_directory, request, jsonify
import json
import os
import sqlite3
from datetime import datetime

app = Flask(__name__)

# Инициализация БД
DB_FILE = 'animations.db'

def init_db():
    """Инициализирует базу данных"""
    if not os.path.exists(DB_FILE):
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''CREATE TABLE animations
                     (id TEXT PRIMARY KEY,
                      title TEXT NOT NULL,
                      description TEXT,
                      code TEXT NOT NULL,
                      image_data TEXT,
                      created_at TIMESTAMP,
                      updated_at TIMESTAMP)''')
        conn.commit()
        conn.close()

def get_db_connection():
    """Получить подключение к БД"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Инициализируем БД при запуске
init_db()

# ===== Основные роуты =====

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serv статичные файлы (CSS, JS, images)"""
    if os.path.isfile(filename):
        return send_from_directory('.', filename)
    return "File not found", 404

# ===== API для анимаций =====

@app.route('/api/animations', methods=['GET'])
def get_animations():
    """Получить все анимации"""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('SELECT * FROM animations ORDER BY created_at DESC')
        animations = c.fetchall()
        conn.close()
        
        result = {}
        for anim in animations:
            result[anim['id']] = {
                'title': anim['title'],
                'description': anim['description'],
                'code': anim['code'],
                'image': anim['image_data']
            }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/animations', methods=['POST'])
def add_animation():
    """Добавить новую анимацию"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        c = conn.cursor()
        
        now = datetime.now().isoformat()
        c.execute('''INSERT INTO animations 
                     (id, title, description, code, image_data, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?)''',
                  (data['id'], data['title'], data.get('description', ''),
                   data['code'], data.get('image'), now, now))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/animations/<animation_id>', methods=['DELETE'])
def delete_animation(animation_id):
    """Удалить анимацию"""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('DELETE FROM animations WHERE id = ?', (animation_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
