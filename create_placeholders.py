"""
Простой генератор плейсхолдер изображений для быстрого старта
Требует: pip install Pillow
"""
from PIL import Image, ImageDraw
import os

os.makedirs('images', exist_ok=True)

def create_placeholder(filename, title, color):
    """Создать простое плейсхолдер изображение"""
    # Размер изображения
    width, height = 400, 300
    
    # Создаём изображение with градиентом
    img = Image.new('RGB', (width, height), color=color)
    draw = ImageDraw.Draw(img)
    
    # Добавляем текст
    text = f"🐢 {title}"
    try:
        draw.text((width//2 - 150, height//2 - 20), text, fill='white', font=None)
    except:
        draw.text((width//2 - 150, height//2 - 20), f"[{title}]", fill='white')
    
    # Сохраняем
    img.save(f'images/{filename}.png')
    print(f'✓ Создано: images/{filename}.png')

# Цвета для каждой анимации
animations = {
    'spiral': ('#FF6B6B', 'Спираль'),
    'circles': ('#4ECDC4', 'Концентрические Круги'),
    'stars': ('#FFD700', 'Звёзды'),
    'flower': ('#FF69B4', 'Цветок'),
    'wave': ('#45B7D1', 'Волна'),
    'polygons': ('#8338EC', 'Многоугольники'),
    'mandala': ('#FB5607', 'Мандала'),
    'tree': ('#2D5016', 'Дерево'),
    'snowflake': ('#0099FF', 'Снежинка'),
}

print("=" * 50)
print("📸 Создаём плейсхолдер изображения...")
print("=" * 50)

try:
    for name, (color, title) in animations.items():
        create_placeholder(name, title, color)
    
    print("=" * 50)
    print("✓ Плейсхолдер изображения созданы!")
    print("=" * 50)
except Exception as e:
    print(f"❌ Ошибка: {e}")
    print("\nУстановите Pillow: pip install pillow")
