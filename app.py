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

# Инициализация БД - используем постоянное хранилище для Render
# Render предоставляет постоянную директорию /opt/render/project/src
DB_FILE = os.path.join(os.getcwd(), 'animations.db')

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
                      color TEXT,
                      icon TEXT,
                      created_at TIMESTAMP,
                      updated_at TIMESTAMP)''')
        
        # Создаем таблицу для скрытых анимаций
        c.execute('''CREATE TABLE hidden_animations
                     (id TEXT PRIMARY KEY,
                      hidden_at TIMESTAMP)''')
        
        conn.commit()
        conn.close()
        print("База данных создана")
    else:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        
        # Проверяем есть ли таблица hidden_animations, если нет - создаем
        try:
            c.execute('SELECT * FROM hidden_animations LIMIT 1')
        except:
            c.execute('''CREATE TABLE hidden_animations
                         (id TEXT PRIMARY KEY,
                          hidden_at TIMESTAMP)''')
            conn.commit()
        
        # Проверяем и добавляем колонки icon и color если их нет
        try:
            c.execute('SELECT icon FROM animations LIMIT 1')
        except:
            c.execute('ALTER TABLE animations ADD COLUMN icon TEXT')
            c.execute('ALTER TABLE animations ADD COLUMN color TEXT')
            conn.commit()
        
        conn.close()
        print("База данных проверена и обновлена")

def backup_data():
    """Создает бэкап данных в файл"""
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        # Получаем все анимации
        c.execute('SELECT * FROM animations ORDER BY created_at DESC')
        animations = c.fetchall()
        
        # Получаем скрытые анимации
        c.execute('SELECT id FROM hidden_animations')
        hidden = [row['id'] for row in c.fetchall()]
        
        conn.close()
        
        # Сохраняем в JSON файл
        backup_data = {
            'animations': [
                {
                    'id': anim['id'],
                    'title': anim['title'],
                    'description': anim['description'],
                    'code': anim['code'],
                    'image_data': anim['image_data'],
                    'color': anim['color'],
                    'icon': anim['icon'],
                    'created_at': anim['created_at'],
                    'updated_at': anim['updated_at']
                }
                for anim in animations
            ],
            'hidden': hidden,
            'backup_date': datetime.now().isoformat()
        }
        
        with open('animations_backup.json', 'w', encoding='utf-8') as f:
            json.dump(backup_data, f, ensure_ascii=False, indent=2)
        
        print(f"Бэкап создан: {len(animations)} анимаций")
        
    except Exception as e:
        print(f"Ошибка бэкапа: {e}")

def restore_data():
    """Восстанавливает данные из бэкапа если база пуста"""
    try:
        if not os.path.exists('animations_backup.json'):
            return False
            
        with open('animations_backup.json', 'r', encoding='utf-8') as f:
            backup_data = json.load(f)
        
        conn = get_db_connection()
        c = conn.cursor()
        
        # Восстанавливаем анимации
        for anim in backup_data['animations']:
            c.execute('''INSERT OR REPLACE INTO animations 
                         (id, title, description, code, image_data, color, icon, created_at, updated_at)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                     (anim['id'], anim['title'], anim['description'], anim['code'],
                      anim['image_data'], anim['color'], anim['icon'], anim['created_at'], anim['updated_at']))
        
        # Восстанавливаем скрытые анимации
        for hidden_id in backup_data['hidden']:
            c.execute('INSERT OR REPLACE INTO hidden_animations (id, hidden_at) VALUES (?, ?)',
                     (hidden_id, datetime.now().isoformat()))
        
        conn.commit()
        conn.close()
        
        print(f"Восстановлено: {len(backup_data['animations'])} анимаций")
        return True
        
    except Exception as e:
        print(f"Ошибка восстановления: {e}")
        return False

def save_backup_after_change():
    """Сохраняет бэкап после каждого изменения"""
    backup_data()

def get_db_connection():
    """Получить подключение к БД"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# Инициализируем БД при запуске
init_db()

# Проверяем нужно ли восстановить данные
conn = get_db_connection()
c = conn.cursor()
c.execute('SELECT COUNT(*) as count FROM animations')
count = c.fetchone()['count']
conn.close()

if count == 0 and os.path.exists('animations_backup.json'):
    print("База пуста, пробуем восстановить из бэкапа...")
    if restore_data():
        print("Данные успешно восстановлены")
    else:
        print("Не удалось восстановить данные")

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
                'image': anim['image_data'],
                'color': anim['color'] if 'color' in anim.keys() else '#667eea',
                'icon': anim['icon'] if 'icon' in anim.keys() else ''
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
                     (id, title, description, code, image_data, color, icon, created_at, updated_at)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                 (data['id'], data.get('title'), data.get('description', ''),
                  data['code'], data.get('image'), data.get('color'), data.get('icon'), now, now))
        
        conn.commit()
        conn.close()
        
        # Создаем бэкап после добавления
        save_backup_after_change()
        
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
                     SET title = ?, description = ?, code = ?, icon = ?, color = ?, updated_at = ?
                     WHERE id = ?''',
                 (data.get('title'), data.get('description'), data.get('code'), 
                  data.get('icon'), data.get('color'), datetime.now(), animation_id))
        
        conn.commit()
        conn.close()
        
        # Создаем бэкап после обновления
        save_backup_after_change()
        
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
        
        # Создаем бэкап после удаления
        save_backup_after_change()
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
