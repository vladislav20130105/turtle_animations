#!/usr/bin/env python3
"""
Скрипт для подготовки галереи - создаёт все необходимые изображения
"""

import os
import sys

def create_simple_png():
    """Создаёт простые PNG изображения с основными цветами"""
    try:
        from PIL import Image, ImageDraw
        
        os.makedirs('images', exist_ok=True)
        
        animations = [
            ('spiral', '#FF6B6B', '🌀 Спираль'),
            ('circles', '#4ECDC4', '⭕ Круги'),
            ('stars', '#FFD700', '⭐ Звёзды'),
            ('flower', '#FF69B4', '🌸 Цветок'),
            ('wave', '#45B7D1', '〰️ Волна'),
            ('polygons', '#8338EC', '▶️ Полигоны'),
            ('mandala', '#FB5607', '✨ Мандала'),
            ('tree', '#2D5016', '🌲 Дерево'),
            ('snowflake', '#0099FF', '❄️ Снежинка'),
        ]
        
        print("📸 Создаю изображения плейсхолдеров...")
        
        for name, color, title in animations:
            img = Image.new('RGB', (400, 300), color=color)
            draw = ImageDraw.Draw(img)
            
            # Добавляем заголовок
            try:
                draw.text((50, 130), title, fill='white')
            except:
                pass
            
            filepath = f'images/{name}.png'
            img.save(filepath)
            print(f'  ✓ {filepath}')
        
        print("\n✓ Плейсхолдер изображения созданы!\n")
        return True
    except ImportError:
        print("❌ PIL (Pillow) не установлен")
        print("   Установите: pip install pillow\n")
        return False

def create_matplotlib_images():
    """Создаёт изображения с помощью matplotlib"""
    try:
        import matplotlib
        matplotlib.use('Agg')  # Non-interactive backend
        print("📊 Генерирую изображения с помощью matplotlib...")
        exec(open('generate_images_matplotlib.py').read())
        return True
    except ImportError:
        print("❌ matplotlib не установлен")
        print("   Установите: pip install matplotlib numpy\n")
        return False
    except Exception as e:
        print(f"❌ Ошибка при создании изображений: {e}\n")
        return False

def main():
    print("=" * 60)
    print("🐢 Галерея Turtle Анимаций - Подготовка")
    print("=" * 60)
    print()
    
    # Проверяем существование необходимых файлов
    required_files = ['index.html', 'style.css', 'script.js']
    missing = [f for f in required_files if not os.path.exists(f)]
    if missing:
        print(f"❌ Отсутствуют файлы: {', '.join(missing)}")
        return
    
    # Пытаемся создать изображения
    success = create_simple_png()
    
    if not success:
        print("\nПопытка создания с matplotlib...")
        success = create_matplotlib_images()
    
    if success:
        print("=" * 60)
        print("✓ Подготовка завершена успешно!")
        print("=" * 60)
        print("\n🌐 Откройте файл 'index.html' в браузере\n")
    else:
        print("=" * 60)
        print("⚠️  Требуется установка зависимостей")
        print("=" * 60)
        print("\nУстановите одно из:")
        print("  • pip install pillow        (быстро)")
        print("  • pip install matplotlib     (качественнее)\n")

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()
