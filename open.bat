@echo off
REM Скрипт для открытия галереи в браузере

cd /d "%~dp0"

echo.
echo ===============================================
echo 🐢 Галерея Turtle Анимаций
echo ===============================================
echo.

REM Открываем index.html в браузере по умолчанию
start "" index.html

if errorlevel 1 (
    echo ❌ Не удалось открыть файл
    echo Откройте вручную: index.html
) else (
    echo ✓ Сайт открыт в браузере!
)

echo.
