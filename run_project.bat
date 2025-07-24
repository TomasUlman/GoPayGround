@echo off
REM === Start PHP backend server ===
start "PHP Server" cmd /k "cd /d %~dp0backend && php -S localhost:8000"

REM === Start Vite frontend ===
start "Vite Frontend" cmd /k "cd /d %~dp0 && npm run dev"

REM === Open browser ===
start chrome "http://localhost:5173/"


