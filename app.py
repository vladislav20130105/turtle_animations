#!/usr/bin/env python3
"""
Flask приложение для Render хостинга
Серверит статичные файлы галереи
"""

from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serv статичные файлы (CSS, JS, images)"""
    if os.path.isfile(filename):
        return send_from_directory('.', filename)
    return "File not found", 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
