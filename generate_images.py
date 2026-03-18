import turtle
from PIL import ImageGrab
import os
import math

# Убедитесь, что существует папка images
os.makedirs('images', exist_ok=True)

def capture_and_save(filename):
    """Захватить скриншот окна и сохранить как PNG"""
    # Получить координаты окна turtle
    canvas = turtle.getscreen().getcanvas()
    x = canvas.winfo_rootx()
    y = canvas.winfo_rooty()
    w = canvas.winfo_width()
    h = canvas.winfo_height()
    
    # Захватить область и сохранить
    img = ImageGrab.grab(bbox=(x, y, x+w, y+h))
    img.save(f'images/{filename}.png')
    print(f'✓ Сохранено: images/{filename}.png')

# ============== СПИРАЛЬ ==============
def draw_spiral():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)
    t.pensize(2)

    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
    for i in range(100):
        t.pencolor(colors[i % 5])
        t.forward(i * 2)
        t.right(75)

    capture_and_save('spiral')
    screen.clear()
    turtle.resetscreen()

# ============== КОНЦЕНТРИЧЕСКИЕ КРУГИ ==============
def draw_circles():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('#1a1a2e')
    t = turtle.Turtle()
    t.speed(0)

    colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']

    for i in range(len(colors)):
        t.pencolor(colors[i])
        t.pensize(3)
        t.circle(100 - i * 15)
    
    capture_and_save('circles')
    screen.clear()
    turtle.resetscreen()

# ============== ЗВЁЗДЫ ==============
def draw_stars():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)

    def draw_star(size, color):
        t.pencolor(color)
        t.pensize(2)
        for _ in range(5):
            t.forward(size)
            t.right(144)

    colors = ['#FF1493', '#00FA9A', '#00BFFF', '#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']

    for i in range(8):
        t.penup()
        t.goto(0, 0)
        t.setheading(i * 45)
        t.forward(150)
        draw_star(50, colors[i])

    capture_and_save('stars')
    screen.clear()
    turtle.resetscreen()

# ============== ЦВЕТОК ==============
def draw_flower():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)

    for i in range(36):
        t.pencolor(['#FF69B4', '#FFB6C1', '#FF1493'][i % 3])
        t.circle(100)
        t.right(10)

    capture_and_save('flower')
    screen.clear()
    turtle.resetscreen()

# ============== ВОЛНА ==============
def draw_wave():
    import math
    screen = turtle.Screen()
    screen.setup(width=1000, height=600)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)
    t.pensize(2)
    t.pencolor('#FF6B6B')

    t.penup()
    t.goto(-400, 0)
    t.pendown()

    for x in range(-400, 400, 5):
        y = 100 * math.sin(x / 50)
        t.goto(x, y)

    capture_and_save('wave')
    screen.clear()
    turtle.resetscreen()

# ============== МНОГОУГОЛЬНИКИ ==============
def draw_polygons():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)

    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#52C0C0']

    for sides in range(3, 13):
        angle = 360 / sides
        t.pencolor(colors[sides - 3])
        t.pensize(2)
        for _ in range(sides):
            t.forward(120 - (sides - 3) * 8)
            t.right(angle)
        t.penup()
        t.goto(0, 0)
        t.pendown()
        t.setheading(0)

    capture_and_save('polygons')
    screen.clear()
    turtle.resetscreen()

# ============== МАНДАЛА ==============
def draw_mandala():
    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)

    colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']

    for i in range(36):
        t.pencolor(colors[i % 6])
        t.pensize(2)
        
        for _ in range(4):
            t.forward(100)
            t.right(90)
        
        t.right(10)

    capture_and_save('mandala')
    screen.clear()
    turtle.resetscreen()

# ============== ФРАКТАЛЬНОЕ ДЕРЕВО ==============
def draw_tree():
    def tree(branch_len, t):
        if branch_len > 5:
            t.forward(branch_len)
            t.right(20)
            tree(branch_len - 15, t)
            t.left(40)
            tree(branch_len - 15, t)
            t.right(20)
            t.backward(branch_len)

    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('white')
    t = turtle.Turtle()
    t.speed(0)
    t.pencolor('#2D5016')
    t.pensize(2)
    t.penup()
    t.goto(0, -300)
    t.pendown()
    t.setheading(90)

    tree(100, t)

    capture_and_save('tree')
    screen.clear()
    turtle.resetscreen()

# ============== СНЕЖИНКА ==============
def draw_snowflake():
    def branch(length, t):
        if length > 5:
            t.forward(length)
            t.right(60)
            branch(length / 1.5, t)
            t.left(120)
            branch(length / 1.5, t)
            t.right(60)
            t.backward(length)

    screen = turtle.Screen()
    screen.setup(width=800, height=800)
    screen.bgcolor('#E0F4FF')
    t = turtle.Turtle()
    t.speed(0)
    t.pencolor('#0099FF')
    t.pensize(2)

    for i in range(6):
        t.penup()
        t.goto(0, 0)
        t.setheading(i * 60)
        t.pendown()
        branch(100, t)

    capture_and_save('snowflake')
    screen.clear()
    turtle.resetscreen()

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
    finally:
        turtle.done()
