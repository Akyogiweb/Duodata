@echo off
REM Start the Duo Data website on THIS machine.
REM Double-click this file, or run:  start.bat
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed. Install Node 18+ from https://nodejs.org/ then run start.bat again.
  pause
  exit /b 1
)

where yarn >nul 2>&1
if errorlevel 1 (
  echo Enabling Yarn via Corepack...
  call corepack enable
  call corepack prepare yarn@1.22.22 --activate
)

if not exist frontend\.env (
  copy frontend\env.example frontend\.env
  echo Created frontend\.env
)

cd frontend
call yarn install
echo.
echo Opening http://localhost:3000
echo Leave this window open. Press Ctrl+C to stop.
echo.
call yarn start
pause
