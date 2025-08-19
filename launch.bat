@echo off
REM Averby Admin Console - Launch Script for Windows
REM This script handles all setup and launches the development server

echo.
echo    ___                  __         
echo   /   ^|_   _____  _____/ /_  __  __
echo  / /^| ^| ^| / / _ \/ ___/ __ \/ / / /
echo / ___ ^| ^|/ /  __/ /  / /_/ / /_/ / 
echo /_/  ^|_^|___/\___/_/  /_.___/\__, /  
echo                            /____/   
echo       Admin Console
echo.

REM Check if bun is installed
where bun >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Bun is not installed!
    echo Please install Bun first: https://bun.sh
    pause
    exit /b 1
)

echo [OK] Bun is installed

REM Check if dependencies are installed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call bun install
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies are already installed
)

REM Kill any existing process on port 8030
netstat -ano | findstr :8030 >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] Port 8030 is in use. Attempting to free it...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8030 ^| findstr LISTENING') do (
        taskkill /PID %%a /F >nul 2>nul
    )
    timeout /t 1 /nobreak >nul
    echo [OK] Port 8030 is now free
)

REM Parse arguments
set OPEN_BROWSER=1
set RUN_TESTS=0
set BUILD_CSS=0

:parse_args
if "%~1"=="" goto end_parse
if "%~1"=="--no-browser" (
    set OPEN_BROWSER=0
    shift
    goto parse_args
)
if "%~1"=="--test" (
    set RUN_TESTS=1
    shift
    goto parse_args
)
if "%~1"=="--build" (
    set BUILD_CSS=1
    shift
    goto parse_args
)
if "%~1"=="--help" (
    echo.
    echo Usage: launch.bat [options]
    echo.
    echo Options:
    echo   --no-browser  Don't open browser automatically
    echo   --test        Run tests after launching
    echo   --build       Build CSS before launching
    echo   --help        Show this help message
    echo.
    echo Examples:
    echo   launch.bat                    # Launch server and open browser
    echo   launch.bat --no-browser       # Launch server only
    echo   launch.bat --build            # Build CSS then launch
    echo   launch.bat --test             # Launch and run tests
    pause
    exit /b 0
)
echo [ERROR] Unknown option: %~1
echo Use --help for usage information
pause
exit /b 1

:end_parse

REM Build CSS if requested
if %BUILD_CSS%==1 (
    echo [INFO] Building optimized CSS...
    call bun run build
    echo [OK] CSS built to dist/output.css
)

REM Start the server
echo [INFO] Starting development server on port 8030...
echo.

REM Start server in new window
start "Averby Server" /min cmd /c "bun run serve"

REM Wait for server to start
set COUNTER=0
:wait_loop
if %COUNTER% geq 10 goto server_failed
curl -s http://localhost:8030 >nul 2>nul
if %errorlevel% equ 0 goto server_started
timeout /t 1 /nobreak >nul
set /a COUNTER=%COUNTER%+1
goto wait_loop

:server_failed
echo [ERROR] Server failed to start
pause
exit /b 1

:server_started
echo [OK] Server is running at http://localhost:8030

REM Open browser if requested
if %OPEN_BROWSER%==1 (
    timeout /t 1 /nobreak >nul
    start http://localhost:8030/base.html
    echo [OK] Browser opened
)

REM Run tests if requested
if %RUN_TESTS%==1 (
    echo [INFO] Running tests in 3 seconds...
    timeout /t 3 /nobreak
    call bun run test
)

echo.
echo ====================================================
echo   Server:  http://localhost:8030/base.html
echo   Status:  Running
echo.
echo   The server is running in a separate window.
echo   Close that window or press Ctrl+C there to stop.
echo ====================================================
echo.
pause