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
        # Таблица для отслеживания удаленных встроенных анимаций
        c.execute('''CREATE TABLE hidden_animations
                     (id TEXT PRIMARY KEY,
                      hidden_at TIMESTAMP)''')
        conn.commit()
        conn.close()
    else:
        # Проверяем есть ли таблица hidden_animations, если нет - создаем
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        try:
            c.execute('SELECT * FROM hidden_animations LIMIT 1')
        except:
            c.execute('''CREATE TABLE hidden_animations
                         (id TEXT PRIMARY KEY,
                          hidden_at TIMESTAMP)''')
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
    """Получить все анимации (исключая скрытые)"""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        # Получаем список скрытых встроенных анимаций
        c.execute('SELECT id FROM hidden_animations')
        hidden = set(row['id'] for row in c.fetchall())
        
        # Получаем пользовательские анимации
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
        
        # Добавляем встроенные анимации, кроме скрытых
        builtin_codes = {
            'spiral': {'title': 'Спираль', 'description': 'Геометрическая спираль с постоянно растущим размером'},
            'circles': {'title': 'Концентрические Круги', 'description': 'Вложенные окружности с радужными цветами'},
            'stars': {'title': 'Звёзды', 'description': '8 звёзд, расположенных по кругу'},
            'flower': {'title': 'Цветок', 'description': 'Красивый цветок из вращающихся кругов'},
            'wave': {'title': 'Волна', 'description': 'Плавная синусоидальная волна'},
            'polygons': {'title': 'Многоугольники', 'description': 'Вложенные правильные многоугольники'},
            'mandala': {'title': 'Мандала', 'description': 'Сложный симметричный узор'},
            'tree': {'title': 'Фрактальное Дерево', 'description': 'Рекурсивное дерево с ветвями'},
            'snowflake': {'title': 'Снежинка', 'description': 'Симметричная снежинка с кристаллическими ветвями'}
        }
        
        # Список встроенных кодов (из script.js)
        builtin_code_content = {
            'spiral': 'import turtle\n\n# Настройки\nscreen = turtle.Screen()\nscreen.setup(width=800, height=800)\nt = turtle.Turtle()\nt.speed(0)\nt.pensize(2)\n\n# Рисуем спираль\ncolors = [\'#FF6B6B\', \'#4ECDC4\', \'#45B7D1\', \'#FFA07A\', \'#98D8C8\']\nfor i in range(100):\n    t.pencolor(colors[i % 5])\n    t.forward(i * 2)\n    t.right(75)\n\nscreen.exitonclick()',
            # ... остальные коды в script.js
        }
        
        for anim_id, info in builtin_codes.items():
            if anim_id not in hidden:
                result[anim_id] = {
                    'title': info['title'],
                    'description': info['description'],
                    'code': f"# {info['title']} - см. скрипт для полного кода",
                    'image': None
                }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hidden', methods=['GET'])
def get_hidden_animations():
    """Получить список скрытых анимаций"""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        c.execute('SELECT id FROM hidden_animations')
        hidden = [row['id'] for row in c.fetchall()]
        conn.close()
        
        return jsonify({'hidden': hidden})
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

@app.route('/api/animations/<animation_id>', methods=['PUT'])
def update_animation(animation_id):
    """Обновить анимацию"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        c = conn.cursor()
        
        c.execute('''UPDATE animations 
                     SET title = ?, description = ?, code = ?, updated_at = ?
                     WHERE id = ?''',
                 (data.get('title'), data.get('description'), data.get('code'), datetime.now(), animation_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Анимация обновлена'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/animations/<animation_id>', methods=['DELETE'])
def delete_animation(animation_id):
    """Удалить анимацию или скрыть встроенную"""
    try:
        # Список встроенных анимаций
        builtin_animations = ['spiral', 'circles', 'stars', 'flower', 'wave', 'polygons', 'mandala', 'tree', 'snowflake']
        
        conn = get_db_connection()
        c = conn.cursor()
        
        if animation_id in builtin_animations:
            # Для встроенных анимаций - добавляем в hidden_animations
            now = datetime.now().isoformat()
            c.execute('INSERT OR REPLACE INTO hidden_animations (id, hidden_at) VALUES (?, ?)',
                     (animation_id, now))
        else:
            # Для пользовательских - удаляем полностью
            c.execute('DELETE FROM animations WHERE id = ?', (animation_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
