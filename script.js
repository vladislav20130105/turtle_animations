const codeExamples = {
    spiral: `import turtle

# Настройки
screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)
t.pensize(2)

# Рисуем спираль
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
for i in range(100):
    t.pencolor(colors[i % 5])
    t.forward(i * 2)
    t.right(75)

screen.exitonclick()`,

    circles: `import turtle

screen = turtle.Screen()
screen.setup(width=800, height=800)
screen.bgcolor('#1a1a2e')
t = turtle.Turtle()
t.speed(0)

colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']

# Рисуем концентрические круги
for i in range(len(colors)):
    t.pencolor(colors[i])
    t.pensize(3)
    t.circle(100 - i * 15)
    
t.hideturtle()
screen.exitonclick()`,

    stars: `import turtle
import math

screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)

def draw_star(size, color):
    t.pencolor(color)
    t.pensize(2)
    for _ in range(5):
        t.forward(size)
        t.right(144)

colors = ['#FF1493', '#00FA9A', '#00BFFF', '#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FF4500']

# Рисуем 8 звёзд по кругу
for i in range(8):
    t.penup()
    t.goto(0, 0)
    t.setheading(i * 45)
    t.forward(150)
    draw_star(50, colors[i])

t.hideturtle()
screen.exitonclick()`,

    flower: `import turtle

screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)

# Рисуем цветок с помощью кругов
for i in range(36):
    t.pencolor(['#FF69B4', '#FFB6C1', '#FF1493'][i % 3])
    t.circle(100)
    t.right(10)

t.hideturtle()
screen.exitonclick()`,

    wave: `import turtle
import math

screen = turtle.Screen()
screen.setup(width=1000, height=600)
t = turtle.Turtle()
t.speed(0)
t.pensize(2)

# Рисуем волну
t.penup()
t.goto(-400, 0)
t.pendown()

for x in range(-400, 400, 5):
    y = 100 * math.sin(x / 50)
    t.goto(x, y)

t.hideturtle()
screen.exitonclick()`,

    polygons: `import turtle

screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)

colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#52C0C0']

# Рисуем вложенные многоугольники
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

t.hideturtle()
screen.exitonclick()`,

    mandala: `import turtle

screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)

colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFA5']

# Рисуем мандалу
for i in range(36):
    t.pencolor(colors[i % 6])
    t.pensize(2)
    
    for _ in range(4):
        t.forward(100)
        t.right(90)
    
    t.right(10)

t.hideturtle()
screen.exitonclick()`,

    tree: `import turtle

def draw_tree(branch_len, t):
    if branch_len > 5:
        t.forward(branch_len)
        t.right(20)
        draw_tree(branch_len - 15, t)
        t.left(40)
        draw_tree(branch_len - 15, t)
        t.right(20)
        t.backward(branch_len)

screen = turtle.Screen()
screen.setup(width=800, height=800)
t = turtle.Turtle()
t.speed(0)
t.penup()
t.goto(0, -300)
t.pendown()
t.setheading(90)

draw_tree(100, t)

t.hideturtle()
screen.exitonclick()`,

    snowflake: `import turtle

def draw_branch(length, t):
    if length > 5:
        t.forward(length)
        t.right(60)
        draw_branch(length / 1.5, t)
        t.left(120)
        draw_branch(length / 1.5, t)
        t.right(60)
        t.backward(length)

screen = turtle.Screen()
screen.setup(width=800, height=800)
screen.bgcolor('#E0F4FF')
t = turtle.Turtle()
t.speed(0)
t.pencolor('#0099FF')
t.pensize(2)

# Рисуем снежинку (6 ветвей)
for i in range(6):
    t.penup()
    t.goto(0, 0)
    t.setheading(i * 60)
    t.pendown()
    draw_branch(100, t)

t.hideturtle()
screen.exitonclick()`
};

function showCode(animationName) {
    const modal = document.getElementById('codeModal');
    const codeTitle = document.getElementById('codeTitle');
    const codeContent = document.getElementById('codeContent');
    
    const titles = {
        spiral: 'Спираль',
        circles: 'Концентрические Круги',
        stars: 'Звёзды',
        flower: 'Цветок',
        wave: 'Волна',
        polygons: 'Многоугольники',
        mandala: 'Мандала',
        tree: 'Фрактальное Дерево',
        snowflake: 'Снежинка'
    };
    
    codeTitle.textContent = `Код: ${titles[animationName]}`;
    codeContent.textContent = codeExamples[animationName];
    
    modal.style.display = 'block';
}

function closeCode() {
    document.getElementById('codeModal').style.display = 'none';
}

function copyToClipboard() {
    const codeContent = document.getElementById('codeContent').textContent;
    navigator.clipboard.writeText(codeContent).then(() => {
        showNotification('Код скопирован в буфер обмена! 📋', 'success');
    }).catch(() => {
        showNotification('Ошибка при копировании кода', 'error');
    });
}

// =========== ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ===========

// Определяем, мобильное ли устройство
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768 && 'ontouchstart' in window);
}

// Добавляем мобильные оптимизации при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (isMobileDevice()) {
        // Добавляем класс для мобильных стилей
        document.body.classList.add('mobile-device');
        
        // Оптимизация скролла для мобильных
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('.modal-content')) {
                e.stopPropagation();
            }
        }, { passive: false });
        
        // Предотвращаем двойной тап для zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
});

// =========== ЗАГРУЗКА ДАННЫХ С СЕРВЕРА ===========

async function loadAnimationsFromServer() {
    try {
        // Получаем список скрытых анимаций
        const hiddenResponse = await fetch('/api/hidden');
        const hiddenData = hiddenResponse.ok ? await hiddenResponse.json() : { hidden: [] };
        const hiddenSet = new Set(hiddenData.hidden);
        
        // Получаем анимации с сервера
        const response = await fetch('/api/animations');
        if (!response.ok) throw new Error('Failed to fetch animations');
        
        const animations = await response.json();
        
        // Загружаем встроенные анимации (если не скрыты)
        const builtInAnimations = [
            { id: 'spiral', name: 'Спираль', icon: '🌀', color: '#FF6B6B', description: 'Геометрическая спираль с постоянно растущим размером' },
            { id: 'circles', name: 'Концентрические Круги', icon: '⭕', color: '#4ECDC4', description: 'Вложенные окружности с радужными цветами' },
            { id: 'stars', name: 'Звёзды', icon: '⭐', color: '#FFD700', description: '8 звёзд, расположенных по кругу' },
            { id: 'flower', name: 'Цветок', icon: '🌸', color: '#FF69B4', description: 'Красивый цветок из вращающихся кругов' },
            { id: 'wave', name: 'Волна', icon: '〰️', color: '#45B7D1', description: 'Плавная синусоидальная волна' },
            { id: 'polygons', name: 'Многоугольники', icon: '▶️', color: '#8338EC', description: 'Вложенные правильные многоугольники' },
            { id: 'mandala', name: 'Мандала', icon: '✨', color: '#FB5607', description: 'Сложный симметричный узор' },
            { id: 'tree', name: 'Фрактальное Дерево', icon: '🌲', color: '#2D5016', description: 'Рекурсивное дерево с ветвями' },
            { id: 'snowflake', name: 'Снежинка', icon: '❄️', color: '#0099FF', description: 'Симметричная снежинка с кристаллическими ветвями' }
        ];
        
        // Добавляем встроенные анимации (только не скрытые)
        builtInAnimations.forEach(anim => {
            if (!hiddenSet.has(anim.id)) {
                addCardToGallery(anim.id, anim.name, anim.icon, anim.color, anim.description);
            }
        });
        
        // Добавляем загруженные пользовательские анимации
        Object.entries(animations).forEach(([id, anim]) => {
            // Пропускаем встроенные (они уже добавлены)
            if (!['spiral', 'circles', 'stars', 'flower', 'wave', 'polygons', 'mandala', 'tree', 'snowflake'].includes(id)) {
                addCardToGallery(id, anim.title, '', anim.color || '#667eea', anim.description || '', anim.image);
                codeExamples[id] = anim.code;
            }
        });
        
    } catch (error) {
        console.warn('Could not load animations from server, using localStorage:', error);
        // Fallback на localStorage
        const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
        Object.entries(customAnimations).forEach(([id, anim]) => {
            addCardToGallery(id, anim.name, anim.icon, anim.color, anim.description, anim.image);
            codeExamples[id] = anim.code;
        });
    }
}

// Закрыть модаль при клике вне её
window.onclick = function(event) {
    const codeModal = document.getElementById('codeModal');
    const addModal = document.getElementById('addAnimationModal');
    const confirmModal = document.getElementById('confirmModal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminPanelModal = document.getElementById('adminPanelModal');
    
    if (event.target === codeModal) {
        codeModal.style.display = 'none';
    }
    if (event.target === addModal) {
        addModal.style.display = 'none';
    }
    if (event.target === confirmModal) {
        confirmModal.style.display = 'none';
    }
    if (event.target === adminLoginModal) {
        adminLoginModal.style.display = 'none';
    }
    if (event.target === adminPanelModal) {
        adminPanelModal.style.display = 'none';
    }
}

// =========== АДМИНКА ===========

const ADMIN_CODE = '76559165613751510';

function openAdminLogin() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        openAdminPanel();
    } else {
        document.getElementById('adminLoginModal').style.display = 'block';
    }
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'none';
}

document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const code = document.getElementById('adminCode').value;
    
    if (code === ADMIN_CODE) {
        localStorage.setItem('isAdmin', 'true');
        closeAdminLogin();
        openAdminPanel();
        showNotification('✅ Вы вошли в админку!', 'success');
    } else {
        showNotification('❌ Неверный код доступа!', 'error');
        document.getElementById('adminCode').value = '';
    }
});

function openAdminPanel() {
    const adminList = document.getElementById('adminAnimsList');
    const totalCount = document.getElementById('totalAnimations');
    
    // Загружаем из localStorage + встроенные
    const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
    totalCount.textContent = Object.keys(customAnimations).length;
    
    adminList.innerHTML = '';
    
    if (Object.keys(customAnimations).length === 0) {
        adminList.innerHTML = '<p style="color: var(--text-color); text-align: center; padding: 20px;">Нет добавленных анимаций</p>';
    } else {
        Object.entries(customAnimations).forEach(([id, anim]) => {
            const item = document.createElement('div');
            item.className = 'admin-anim-item';
            item.innerHTML = `
                <div>
                    <strong>${anim.name}</strong>
                    <p style="font-size: 0.85em; opacity: 0.7; margin-top: 5px;">ID: ${id}</p>
                </div>
                <button class="btn-code" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);" onclick="adminDeleteAnimation('${id}')">🗑️</button>
            `;
            adminList.appendChild(item);
        });
    }
    
    // Показываем кнопку добавления
    updateAdminUI();
    document.getElementById('adminPanelModal').style.display = 'block';
}

function closeAdminPanel() {
    document.getElementById('adminPanelModal').style.display = 'none';
}

function adminDeleteAnimation(id) {
    showConfirmDialog(
        'Удалить анимацию?',
        'Эта анимация будет удалена безвозвратно.',
        () => {
            const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
            delete customAnimations[id];
            localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
            
            // Удаляем карточку со страницы
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (card.querySelector(`[onclick*="${id}"]`)) {
                    card.remove();
                }
            });
            
            // Перезагружаем админ-панель
            openAdminPanel();
            showNotification('✅ Анимация удалена из админки!', 'success');
        }
    );
}

function logoutAdmin() {
    localStorage.setItem('isAdmin', 'false');
    closeAdminPanel();
    updateAdminUI();
    showNotification('👋 Вы вышли из админки', 'info');
}

// =========== УПРАВЛЕНИЕ АДМИН UI ===========

function updateAdminUI() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const btnAdd = document.getElementById('btnAddAnimation');
    
    if (isAdmin) {
        btnAdd.style.display = 'block';
    } else {
        btnAdd.style.display = 'none';
    }
    
    // Обновляем видимость кнопок удаления на карточках
    updateDeleteButtons();
}

function updateDeleteButtons() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const deleteButtons = document.querySelectorAll('[onclick*="deleteCustomAnimation"]');
    
    deleteButtons.forEach(btn => {
        if (isAdmin) {
            btn.style.display = 'inline-block';
        } else {
            btn.style.display = 'none';
        }
    });
}

// =========== УПРАВЛЕНИЕ ФОРМОЙ ДОБАВЛЕНИЯ АНИМАЦИИ ===========

function openAddForm() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        showNotification('❌ Только админ может добавлять анимации!', 'error');
        return;
    }
    document.getElementById('addAnimationModal').style.display = 'block';
}

function closeAddForm() {
    document.getElementById('addAnimationModal').style.display = 'none';
    document.getElementById('animationForm').reset();
}

// Обработка отправки формы
document.getElementById('animationForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('animName').value;
    const icon = document.getElementById('animIcon').value;
    const color = document.getElementById('animColor').value;
    const description = document.getElementById('animDescription').value;
    const code = document.getElementById('animCode').value;
    const imageFile = document.getElementById('animImage').files[0];
    
    // Создаем уникальный ID для новой анимации
    const id = 'custom_' + Date.now();
    
    // Если выбран файл - конвертируем его в base64
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = async function(event) {
            const imageData = event.target.result;
            
            // Отправляем на сервер
            try {
                const response = await fetch('/api/animations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id,
                        title: name,
                        description,
                        code,
                        color,
                        image: imageData
                    })
                });
                
                if (response.ok) {
                    // Добавляем код в глобальный объект
                    codeExamples[id] = code;
                    
                    // Создаем новую карточку и добавляем её в галерею
                    addCardToGallery(id, name, '', color, description, imageData);
                    
                    // Закрываем форму
                    closeAddForm();
                    
                    showNotification('✅ Анимация успешно добавлена!', 'success');
                } else {
                    throw new Error('Server response not ok');
                }
            } catch (error) {
                console.error('Error saving animation:', error);
                showNotification('❌ Ошибка при сохранении на сервер. Сохраняю локально...', 'warning');
                
                // Fallback на localStorage
                const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
                customAnimations[id] = {
                    name,
                    icon: '',
                    color,
                    description,
                    code,
                    image: imageData
                };
                localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
                codeExamples[id] = code;
                addCardToGallery(id, name, '', color, description, imageData);
                closeAddForm();
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Без изображения - используем текст/эмодзи
        try {
            const response = await fetch('/api/animations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    title: name,
                    description,
                    code,
                    color
                })
            });
            
            if (response.ok) {
                codeExamples[id] = code;
                addCardToGallery(id, name, icon, color, description);
                closeAddForm();
                showNotification('✅ Анимация успешно добавлена!', 'success');
            } else {
                throw new Error('Server response not ok');
            }
        } catch (error) {
            console.error('Error saving animation:', error);
            showNotification('❌ Ошибка при сохранении на сервер. Сохраняю локально...', 'warning');
            
            // Fallback на localStorage
            const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
            customAnimations[id] = {
                name,
                icon,
                color,
                description,
                code
            };
            localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
            codeExamples[id] = code;
            addCardToGallery(id, name, icon, color, description);
            closeAddForm();
        }
    }
});

// =========== СИСТЕМА УВЕДОМЛЕНИЙ ===========

function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(notification);
    
    // Автоматически удаляем уведомление
    if (duration > 0) {
        // На мобильных устройствах показываем уведомления дольше
        const mobileDuration = isMobileDevice() ? duration * 1.5 : duration;
        
        setTimeout(() => {
            notification.classList.add('removing');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, mobileDuration);
    }
}

// =========== ДИАЛОГ ПОДТВЕРЖДЕНИЯ ===========

function showConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    
    const yesBtn = document.getElementById('confirmYesBtn');
    const noBtn = document.getElementById('confirmNoBtn');
    
    // Очищаем старые обработчики
    yesBtn.onclick = null;
    noBtn.onclick = null;
    
    // Устанавливаем новые обработчики
    yesBtn.onclick = () => {
        onConfirm();
        modal.style.display = 'none';
    };
    
    noBtn.onclick = () => {
        modal.style.display = 'none';
    };
    
    modal.style.display = 'block';
}

// Функция добавления новой карточки на сайт
function addCardToGallery(id, name, icon, color, description, imageData) {
    const gallery = document.querySelector('.gallery');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    const card = document.createElement('div');
    card.className = 'card';
    
    let imageHTML = '';
    if (imageData) {
        // Если есть загруженное изображение - используем его
        imageHTML = `<img src="${imageData}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
        // Иначе используем SVG с эмодзи
        imageHTML = `
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" class="svg-placeholder">
                <rect width="400" height="300" fill="${color}"/>
                <text x="200" y="130" text-anchor="middle" font-size="50" fill="white" style="font-family: Arial, sans-serif;">${icon}</text>
                <text x="200" y="170" text-anchor="middle" font-size="20" fill="white" style="font-family: Arial, sans-serif;">${name}</text>
            </svg>
        `;
    }
    
    card.innerHTML = `
        <div class="card-image">
            ${imageHTML}
        </div>
        <div class="card-content">
            <h2>${name}</h2>
            <p>${description}</p>
            <div style="display: flex; gap: 10px;">
                <button class="btn-code" onclick="showCode('${id}')">👁️ Посмотреть код</button>
                <button class="btn-code" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); display: ${isAdmin ? 'inline-block' : 'none'};" onclick="deleteCustomAnimation('${id}')">🗑️ Удалить</button>
            </div>
        </div>
    `;
    
    gallery.appendChild(card);
}

// Функция удаления пользовательской анимации
function deleteCustomAnimation(id) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        showNotification('❌ Только админ может удалять анимации!', 'error');
        return;
    }
    
    showConfirmDialog(
        'Удалить анимацию?',
        'Эта анимация будет удалена безвозвратно.',
        async () => {
            try {
                // Пробуем удалить с сервера
                const response = await fetch(`/api/animations/${id}`, {
                    method: 'DELETE'
                });
                
                if (response.ok || response.status === 404) {
                    // Успешно удалили или уже удалено
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.warn('Could not delete from server:', error);
            }
            
            // Удаляем из localStorage как backup
            const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
            delete customAnimations[id];
            localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
            
            // Удаляем карточку со страницы
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (card.querySelector(`[onclick*="${id}"]`)) {
                    card.remove();
                }
            });
            
            showNotification('✅ Анимация удалена!', 'success');
        }
    );
}

// Загружаем сохраненные анимации при загрузке страницы
window.addEventListener('load', function() {
    // Загружаем тему
    loadTheme();
    
    // Загружаем анимации с сервера
    loadAnimationsFromServer();
});

// =========== СИСТЕМА ТЕМ ===========

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const btn = document.querySelector('.btn-theme');
    
    if (isDark) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        btn.textContent = '🌙 Тёмный режим';
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        btn.textContent = '☀️ Светлый режим';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const btn = document.querySelector('.btn-theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        btn.textContent = '☀️ Светлый режим';
    } else {
        document.body.classList.remove('dark-theme');
        btn.textContent = '🌙 Тёмный режим';
    }
    
    // Обновляем видимость кнопки добавления
    updateAdminUI();
}
