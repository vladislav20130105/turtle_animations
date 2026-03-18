@echo off
REM Скрипт для создания плейсхолдер изображений

echo.
echo ===============================================
echo Создание плейсхолдер изображений...
echo ===============================================
echo.

REM Создаём папку images если её нет
if not exist images mkdir images

REM Простой способ: используем встроенные средства Windows
REM Для полномасштабного использования, запустите Python скрипты

echo Для создания изображений, выполните одну из команд:
echo.
echo Вариант 1 (matplotlib - рекомендуется):
echo   python generate_images_matplotlib.py
echo.
echo Вариант 2 (turtle + PIL):
echo   python generate_images.py
echo.
echo Вариант 3 (простые плейсхолдеры):
echo   python create_placeholders.py
echo.

echo Откройте index.html в браузере для просмотра сайта
echo.
