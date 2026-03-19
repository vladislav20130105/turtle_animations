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
        
        // Синхронизируем localStorage с сервером
        const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
        let hasChanges = false;
        
        // Добавляем серверные анимации в localStorage (но не удаляем локальные)
        Object.entries(animations).forEach(([id, anim]) => {
            // Пропускаем встроенные
            if (!['spiral', 'circles', 'stars', 'flower', 'wave', 'polygons', 'mandala', 'tree', 'snowflake'].includes(id)) {
                if (!customAnimations[id]) {
                    customAnimations[id] = {
                        name: anim.title,
                        icon: anim.icon || '',
                        color: anim.color || '#667eea',
                        description: anim.description || '',
                        code: anim.code,
                        image: anim.image
                    };
                    hasChanges = true;
                }
            }
        });
        
        // Сохраняем объединенные данные обратно в localStorage
        if (hasChanges) {
            localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
            console.log('Добавлены новые анимации с сервера');
        }
        
        // Теперь отправляем локальные анимации которых нет на сервере
        const serverIds = new Set(Object.keys(animations));
        const localIds = new Set(Object.keys(customAnimations));
        
        // Находим локальные анимации которых нет на сервере
        const missingOnServer = [...localIds].filter(id => 
            !serverIds.has(id) && !['spiral', 'circles', 'stars', 'flower', 'wave', 'polygons', 'mandala', 'tree', 'snowflake'].includes(id)
        );
        
        // Отправляем отсутствующие анимации на сервер
        if (missingOnServer.length > 0) {
            console.log('Отправляем анимации на сервер:', missingOnServer);
            missingOnServer.forEach(async (id) => {
                const anim = customAnimations[id];
                try {
                    await fetch('/api/animations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id,
                            title: anim.name,
                            description: anim.description,
                            code: anim.code,
                            color: anim.color,
                            image: anim.image,
                            icon: anim.icon
                        })
                    });
                    console.log('Отправлена анимация:', id);
                } catch (error) {
                    console.log('Не удалось отправить анимацию:', id);
                }
            });
        }
        
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
        
        // Добавляем все анимации из localStorage (включая синхронизированные)
        Object.entries(customAnimations).forEach(([id, anim]) => {
            addCardToGallery(id, anim.name, anim.icon, anim.color, anim.description, anim.image);
            codeExamples[id] = anim.code;
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

async function openAdminPanel() {
    const adminList = document.getElementById('adminAnimsList');
    
    // Всегда используем localStorage
    const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
    
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
                <div style="display: flex; gap: 8px;">
                    <button class="btn-code" style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);" onclick="editAnimation('${id}')">✏️</button>
                    <button class="btn-code" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);" onclick="adminDeleteAnimation('${id}')">🗑️</button>
                </div>
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

function editAnimation(id) {
    const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
    const anim = customAnimations[id];
    
    if (!anim) {
        showNotification('❌ Анимация не найдена!', 'error');
        return;
    }
    
    // Закрываем админку перед открытием формы редактирования
    closeAdminPanel();
    
    // Заполняем форму данными анимации
    document.getElementById('animName').value = anim.name;
    document.getElementById('animIcon').value = anim.icon || '';
    document.getElementById('animColor').value = anim.color;
    document.getElementById('animDescription').value = anim.description;
    document.getElementById('animCode').value = anim.code;
    
    // Меняем заголовок формы
    document.querySelector('#addAnimationModal h2').textContent = '✏️ Редактировать анимацию';
    
    // Сохраняем ID редактируемой анимации
    document.getElementById('animationForm').setAttribute('data-edit-id', id);
    
    // Показываем форму
    document.getElementById('addAnimationModal').style.display = 'block';
}

// Обработка выбора файла изображения
document.getElementById('animImage')?.addEventListener('change', function(e) {
    const iconInput = document.getElementById('animIcon');
    if (e.target.files.length > 0) {
        // Если выбран файл, очищаем и отключаем поле иконки
        iconInput.value = '';
        iconInput.disabled = true;
        iconInput.style.opacity = '0.5';
        iconInput.placeholder = 'Используется загруженное изображение';
    } else {
        // Если файл не выбран, включаем поле иконки
        iconInput.disabled = false;
        iconInput.style.opacity = '1';
        iconInput.placeholder = '🌀';
    }
});

// Обработка отправки формы для поддержки редактирования
document.getElementById('animationForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Форма отправлена');
    
    const editId = this.getAttribute('data-edit-id');
    const name = document.getElementById('animName').value;
    const iconElement = document.getElementById('animIcon');
    const icon = iconElement.disabled ? '' : iconElement.value; // Если поле отключено, используем пустую иконку
    const color = document.getElementById('animColor').value;
    const description = document.getElementById('animDescription').value;
    const code = document.getElementById('animCode').value;
    
    console.log('Данные формы:', { editId, name, icon, color, description, code: code.substring(0, 50) + '...' });
    
    if (editId) {
        // Режим редактирования - обновляем в localStorage
        const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
        customAnimations[editId] = { name, icon, color, description, code };
        localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
        
        // Обновляем карточку на странице
        updateCardOnPage(editId, name, icon, color, description);
        
        // Обновляем код
        codeExamples[editId] = code;
        
        // Пытаемся сохранить на сервере (но не обязательно)
        try {
            await fetch(`/api/animations/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: name, description, code, icon, color })
            });
        } catch (error) {
            console.log('Server update failed, but localStorage updated');
        }
        
        showNotification('✅ Анимация обновлена!', 'success');
    } else {
        // Режим добавления - сначала сохраняем в localStorage
        console.log('Режим добавления');
        const imageFile = document.getElementById('animImage').files[0];
        
        // Создаем уникальный ID для новой анимации
        const id = 'custom_' + Date.now();
        console.log('Создан ID:', id);
        
        // Сохраняем в localStorage сразу
        const customAnimations = JSON.parse(localStorage.getItem('customAnimations') || '{}');
        const animData = { name, icon, color, description, code };
        console.log('Данные для сохранения:', animData);
        
        if (imageFile) {
            console.log('Есть файл изображения');
            // Если есть файл - конвертируем и сохраняем
            const reader = new FileReader();
            reader.onload = function(event) {
                let imageData = event.target.result;
                
                // Проверяем размер изображения и сжимаем если нужно
                if (imageData.length > 3000000) { // 3MB
                    console.log('Изображение слишком большое, сжимаем...');
                    // Создаем img для сжатия
                    const img = new Image();
                    img.onload = function() {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Уменьшаем размер до 800x600 максимум (максимальное качество)
                        const maxWidth = 800;
                        const maxHeight = 600;
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Сжимаем с качеством 1.0 (100% качество)
                        imageData = canvas.toDataURL('image/jpeg', 1.0);
                        console.log('Изображение сжато до:', imageData.length, 'байт');
                        
                        saveAnimationWithImage(imageData);
                    };
                    img.src = event.target.result;
                } else {
                    saveAnimationWithImage(imageData);
                }
            };
            
            function saveAnimationWithImage(imageData) {
                animData.image = imageData;
                customAnimations[id] = animData;
                
                try {
                    localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
                    console.log('Сохранено в localStorage с изображением');
                    
                    // Добавляем на страницу
                    addCardToGallery(id, name, '', color, description, imageData);
                    codeExamples[id] = code;
                    console.log('Карточка добавлена на страницу');
                    
                    // Пытаемся сохранить на сервере (надежно)
                    fetch('/api/animations', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id, title: name, description, code, color, image: imageData
                        })
                    }).then(response => {
                        if (response.ok) {
                            console.log('Успешно сохранено на сервере');
                        } else {
                            console.log('Ошибка сохранения на сервере');
                        }
                    }).catch(error => {
                        console.log('Сервер недоступен, но localStorage сохранен');
                    });
                    
                    closeAddForm();
                    showNotification('✅ Анимация добавлена!', 'success');
                } catch (error) {
                    if (error.name === 'QuotaExceededError') {
                        showNotification('❌ Слишком большое изображение! Попробуйте изображение меньшего размера.', 'error');
                        console.log('localStorage переполнен');
                    } else {
                        showNotification('❌ Ошибка при сохранении!', 'error');
                        console.error('Ошибка сохранения:', error);
                    }
                }
            }
            
            reader.readAsDataURL(imageFile);
        } else {
            console.log('Без изображения');
            // Без изображения
            customAnimations[id] = animData;
            localStorage.setItem('customAnimations', JSON.stringify(customAnimations));
            console.log('Сохранено в localStorage без изображения');
            
            // Добавляем на страницу
            addCardToGallery(id, name, icon, color, description);
            codeExamples[id] = code;
            console.log('Карточка добавлена на страницу');
            
            // Пытаемся сохранить на сервере
            try {
                fetch('/api/animations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, title: name, description, code, color })
                });
            } catch (error) {
                console.log('Server save failed, but localStorage saved');
            }
            
            showNotification('✅ Анимация добавлена!', 'success');
        }
    }
    
    // Сбрасываем форму
    this.removeAttribute('data-edit-id');
    document.querySelector('#addAnimationModal h2').textContent = '➕ Добавить новую анимацию';
    this.reset();
    
    // Включаем поле иконки обратно
    const iconReset = document.getElementById('animIcon');
    iconReset.disabled = false;
    iconReset.style.opacity = '1';
    iconReset.placeholder = '🌀';
    
    closeAddForm();
});

function updateCardOnPage(id, name, icon, color, description) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const codeBtn = card.querySelector(`[onclick*="${id}"]`);
        if (codeBtn) {
            // Обновляем заголовок и описание
            card.querySelector('h2').textContent = name;
            card.querySelector('p').textContent = description;
            
            // Обновляем изображение если нужно
            const imageContainer = card.querySelector('.card-image');
            if (imageContainer && !imageContainer.querySelector('img')) {
                imageContainer.innerHTML = `
                    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" class="svg-placeholder">
                        <rect width="400" height="300" fill="${color}"/>
                        <text x="200" y="130" text-anchor="middle" font-size="50" fill="white" style="font-family: Arial, sans-serif;">${icon}</text>
                        <text x="200" y="170" text-anchor="middle" font-size="20" fill="white" style="font-family: Arial, sans-serif;">${name}</text>
                    </svg>
                `;
            }
        }
    });
}

function adminDeleteAnimation(id) {
    showConfirmDialog(
        'Удалить анимацию?',
        'Эта анимация будет удалена безвозвратно.',
        () => {
            // Удаляем из localStorage
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
            
            // Пытаемся удалить с сервера
            try {
                fetch(`/api/animations/${id}`, { method: 'DELETE' });
            } catch (error) {
                console.log('Server delete failed, but localStorage updated');
            }
            
            // Перезагружаем админ-панель
            openAdminPanel();
            showNotification('✅ Анимация удалена!', 'success');
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
