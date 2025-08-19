#!/bin/bash

# Averby Admin Console - Launch Script
# This script handles all setup and launches the development server

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print colored message
print_message() {
    echo -e "${BLUE}[Averby]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# ASCII Art Logo
echo -e "${BLUE}"
cat << "EOF"
    ___                  __         
   /   |_   _____  _____/ /_  __  __
  / /| | | / / _ \/ ___/ __ \/ / / /
 / ___ | |/ /  __/ /  / /_/ / /_/ / 
/_/  |_|___/\___/_/  /_.___/\__, /  
                           /____/   
      Admin Console
EOF
echo -e "${NC}"

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    print_error "Bun is not installed!"
    print_message "Please install Bun first: https://bun.sh"
    exit 1
fi

print_success "Bun is installed"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_warning "Dependencies not found. Installing..."
    bun install
    print_success "Dependencies installed"
else
    print_success "Dependencies are already installed"
fi

# Kill any existing process on port 8030
if lsof -Pi :8030 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 8030 is in use. Killing existing process..."
    lsof -Pi :8030 -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
    sleep 1
    print_success "Port 8030 is now free"
fi

# Function to open browser
open_browser() {
    local url=$1
    print_message "Opening browser..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "$url"
        elif command -v gnome-open &> /dev/null; then
            gnome-open "$url"
        else
            print_warning "Could not auto-open browser. Please open manually: $url"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        start "$url"
    else
        print_warning "Could not auto-open browser. Please open manually: $url"
    fi
}

# Parse command line arguments
OPEN_BROWSER=true
RUN_TESTS=false
BUILD_CSS=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --no-browser)
            OPEN_BROWSER=false
            shift
            ;;
        --test)
            RUN_TESTS=true
            shift
            ;;
        --build)
            BUILD_CSS=true
            shift
            ;;
        --help)
            echo "Usage: ./launch.sh [options]"
            echo ""
            echo "Options:"
            echo "  --no-browser  Don't open browser automatically"
            echo "  --test        Run tests after launching"
            echo "  --build       Build CSS before launching"
            echo "  --help        Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./launch.sh                    # Launch server and open browser"
            echo "  ./launch.sh --no-browser       # Launch server only"
            echo "  ./launch.sh --build            # Build CSS then launch"
            echo "  ./launch.sh --test             # Launch and run tests"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Build CSS if requested
if [ "$BUILD_CSS" = true ]; then
    print_message "Building optimized CSS..."
    bun run build
    print_success "CSS built to dist/output.css"
fi

# Start the server
print_message "Starting development server on port 8030..."
echo ""

# Create a temporary file for server output
SERVER_LOG=$(mktemp)

# Start server in background and capture output
bun run serve > "$SERVER_LOG" 2>&1 &
SERVER_PID=$!

# Wait for server to start (max 10 seconds)
COUNTER=0
while [ $COUNTER -lt 10 ]; do
    if curl -s http://localhost:8030 > /dev/null 2>&1; then
        print_success "Server is running at http://localhost:8030"
        break
    fi
    sleep 1
    COUNTER=$((COUNTER + 1))
done

if [ $COUNTER -eq 10 ]; then
    print_error "Server failed to start. Check the log:"
    cat "$SERVER_LOG"
    rm "$SERVER_LOG"
    exit 1
fi

# Clean up temp file
rm "$SERVER_LOG"

# Open browser if requested
if [ "$OPEN_BROWSER" = true ]; then
    sleep 1  # Give server a moment to fully initialize
    open_browser "http://localhost:8030/base.html"
    print_success "Browser opened"
fi

# Run tests if requested
if [ "$RUN_TESTS" = true ]; then
    print_message "Running tests in 3 seconds..."
    sleep 3
    bun run test
fi

echo ""
print_success "Averby Admin Console is running!"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║${NC}  Server:  ${BLUE}http://localhost:8030/base.html${NC}     ${GREEN}║${NC}"
echo -e "${GREEN}║${NC}  Status:  ${GREEN}● Running${NC}                           ${GREEN}║${NC}"
echo -e "${GREEN}║${NC}  PID:     $SERVER_PID                              ${GREEN}║${NC}"
echo -e "${GREEN}║${NC}                                                ${GREEN}║${NC}"
echo -e "${GREEN}║${NC}  Press ${YELLOW}Ctrl+C${NC} to stop the server              ${GREEN}║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Handle Ctrl+C gracefully
trap 'echo ""; print_message "Shutting down server..."; kill $SERVER_PID 2>/dev/null; print_success "Server stopped"; exit 0' INT

# Keep script running and show server output
tail -f /dev/null