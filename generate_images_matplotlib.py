import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
import os
import math

# Убедитесь, что существует папка images
os.makedirs('images', exist_ok=True)

def save_figure(filename):
    """Сохранить текущую фигуру как PNG"""
    plt.savefig(f'images/{filename}.png', dpi=100, bbox_inches='tight', facecolor='white')
    plt.close()
    print(f'✓ Сохранено: images/{filename}.png')

# ============== СПИРАЛЬ ==============
def draw_spiral():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-400, 400)
    ax.set_ylim(-400, 400)
    ax.set_aspect('equal')
    ax.axis('off')
    
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
    
    x, y = 0, 0
    angle = 0
    
    for i in range(100):
        color = colors[i % 5]
        # Рисуем линию
        distance = i * 2
        new_x = x + distance * math.cos(math.radians(angle))
        new_y = y + distance * math.sin(math.radians(angle))
        ax.plot([x, new_x], [y, new_y], color=color, linewidth=2)
        x, y = new_x, new_y
        angle = (angle + 75) % 360
    
    save_figure('spiral')

# ============== КОНЦЕНТРИЧЕСКИЕ КРУГИ ==============
def draw_circles():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='#1a1a2e')
    ax.set_xlim(-200, 200)
    ax.set_ylim(-200, 200)
    ax.set_aspect('equal')
    ax.axis('off')
    
    colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']
    
    for i, color in enumerate(colors):
        radius = 100 - i * 15
        circle = patches.Circle((0, 0), radius, fill=False, edgecolor=color, linewidth=3)
        ax.add_patch(circle)
    
    save_figure('circles')

# ============== ЗВЁЗДЫ ==============
def draw_stars():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-250, 250)
    ax.set_ylim(-250, 250)
    ax.set_aspect('equal')
    ax.axis('off')
    
    def star_points(cx, cy, size, num_points=5):
        points = []
        for i in range(num_points * 2):
            angle = math.pi/2 + (i * math.pi) / num_points
            r = size if i % 2 == 0 else size / 2
            x = cx + r * math.cos(angle)
            y = cy + r * math.sin(angle)
            points.append([x, y])
        return np.array(points)
    
    colors = ['#FF1493', '#00FA9A', '#00BFFF', '#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']
    
    for i, color in enumerate(colors):
        angle = i * 45
        distance = 150
        x = distance * math.cos(math.radians(angle))
        y = distance * math.sin(math.radians(angle))
        
        points = star_points(x, y, 30)
        points = np.vstack([points, points[0]])
        ax.plot(points[:, 0], points[:, 1], color=color, linewidth=2)
    
    save_figure('stars')

# ============== ЦВЕТОК ==============
def draw_flower():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-250, 250)
    ax.set_ylim(-250, 250)
    ax.set_aspect('equal')
    ax.axis('off')
    
    colors_cycle = ['#FF69B4', '#FFB6C1', '#FF1493']
    
    for i in range(36):
        color = colors_cycle[i % 3]
        theta = np.linspace(0, 2*np.pi, 100)
        
        # Смещенный круг
        cx = 100 * math.cos(math.radians(i * 10))
        cy = 100 * math.sin(math.radians(i * 10))
        
        x = cx + 100 * np.cos(theta)
        y = cy + 100 * np.sin(theta)
        ax.plot(x, y, color=color, linewidth=1, alpha=0.7)
    
    save_figure('flower')

# ============== ВОЛНА ==============
def draw_wave():
    fig, ax = plt.subplots(figsize=(10, 6), facecolor='white')
    
    x = np.linspace(-400, 400, 500)
    y = 100 * np.sin(x / 50)
    
    ax.plot(x, y, color='#FF6B6B', linewidth=3)
    ax.set_xlim(-450, 450)
    ax.set_ylim(-150, 150)
    ax.set_aspect('auto')
    ax.axis('off')
    
    save_figure('wave')

# ============== МНОГОУГОЛЬНИКИ ==============
def draw_polygons():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-200, 200)
    ax.set_ylim(-200, 200)
    ax.set_aspect('equal')
    ax.axis('off')
    
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#52C0C0']
    
    for sides in range(3, 13):
        color = colors[sides - 3]
        angles = np.linspace(0, 2*np.pi, sides, endpoint=False)
        
        radius = 120 - (sides - 3) * 8
        x = radius * np.cos(angles)
        y = radius * np.sin(angles)
        
        # Замкнуть многоугольник
        x = np.append(x, x[0])
        y = np.append(y, y[0])
        
        ax.plot(x, y, color=color, linewidth=2)
    
    save_figure('polygons')

# ============== МАНДАЛА ==============
def draw_mandala():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-200, 200)
    ax.set_ylim(-200, 200)
    ax.set_aspect('equal')
    ax.axis('off')
    
    colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']
    
    for i in range(36):
        color = colors[i % 6]
        
        # Квадрат
        angle = i * 10
        size = 100 - (i % 6) * 10
        
        corners = []
        for j in range(4):
            corner_angle = angle + j * 90
            x = size * math.cos(math.radians(corner_angle))
            y = size * math.sin(math.radians(corner_angle))
            corners.append([x, y])
        
        corners.append(corners[0])
        corners = np.array(corners)
        ax.plot(corners[:, 0], corners[:, 1], color=color, linewidth=1, alpha=0.7)
    
    save_figure('mandala')

# ============== ФРАКТАЛЬНОЕ ДЕРЕВО ==============
def draw_tree():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='white')
    ax.set_xlim(-300, 300)
    ax.set_ylim(-400, 200)
    ax.set_aspect('equal')
    ax.axis('off')
    
    def draw_branch(x1, y1, angle, depth):
        if depth == 0:
            return
        
        x2 = x1 + depth * 10 * math.cos(math.radians(angle))
        y2 = y1 + depth * 10 * math.sin(math.radians(angle))
        
        ax.plot([x1, x2], [y1, y2], color='#2D5016', linewidth=depth/2)
        
        draw_branch(x2, y2, angle - 20, depth - 1)
        draw_branch(x2, y2, angle + 20, depth - 1)
    
    draw_branch(0, -200, 90, 10)
    save_figure('tree')

# ============== СНЕЖИНКА ==============
def draw_snowflake():
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='#E0F4FF')
    ax.set_xlim(-250, 250)
    ax.set_ylim(-250, 250)
    ax.set_aspect('equal')
    ax.axis('off')
    
    def draw_branch(x1, y1, angle, depth):
        if depth < 1:
            return
        
        length = 100 * (depth / 5)
        x2 = x1 + length * math.cos(math.radians(angle))
        y2 = y1 + length * math.sin(math.radians(angle))
        
        ax.plot([x1, x2], [y1, y2], color='#0099FF', linewidth=2)
        
        draw_branch(x2, y2, angle - 60, depth - 1)
        draw_branch(x2, y2, angle + 60, depth - 1)
    
    # 6 лучей снежинки
    for i in range(6):
        angle = i * 60
        draw_branch(0, 0, angle, 4)
    
    save_figure('snowflake')

# Генерируем все изображения
if __name__ == '__main__':
    print("=" * 50)
    print("🎨 Генерируем изображения анимаций...")
    print("=" * 50)
    
    try:
        draw_spiral()
        draw_circles()
        draw_stars()
        draw_flower()
        draw_wave()
        draw_polygons()
        draw_mandala()
        draw_tree()
        draw_snowflake()
        
        print("=" * 50)
        print("✓ Все изображения успешно созданы!")
        print("=" * 50)
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
