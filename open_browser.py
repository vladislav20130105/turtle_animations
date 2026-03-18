#!/usr/bin/env python3
"""
Открывает сайт в браузере по умолчанию
"""

import webbrowser
import os
from pathlib import Path

# Получаем путь к index.html
html_file = Path(__file__).parent / 'index.html'

if html_file.exists():
    # Преобразуем путь в file:// URL
    url = html_file.as_uri()
    
    # Открываем в браузере
    webbrowser.open(url)
    print(f"✓ Открываю сайт в браузере: {url}")
else:
    print(f"❌ Файл не найден: {html_file}")
