# Averby Admin Console

A modern, responsive admin dashboard with comprehensive UI improvements implemented using Test-Driven Development (TDD).

## 🚀 Quick Start

### macOS/Linux
```bash
# One-command launch - installs deps, starts server, opens browser
./launch.sh

# Or using Bun:
bun start
```

### Windows
```cmd
# One-command launch for Windows
launch.bat

# Or using Bun:
bun start
```

That's it! The app will automatically open in your browser at http://localhost:8030/base.html

### Additional Options

```bash
# Launch without opening browser
./launch.sh --no-browser

# Build optimized CSS before launching
./launch.sh --build

# Run tests after launching
./launch.sh --test

# See all options
./launch.sh --help
```

## 📦 Using Bun

This project uses [Bun](https://bun.sh/) as the JavaScript runtime and package manager. 

### Installation Commands

```bash
# Install all dependencies
bun install

# Add a new dependency
bun add [package-name]

# Add a dev dependency
bun add -d [package-name]

# Run scripts
bun run [script-name]

# Execute packages directly
bunx [package-name]
```

## 🧪 Testing

Tests are written using Playwright and follow TDD methodology:

```bash
# Run all tests
bun run test

# Run tests with UI mode
bun run test:ui

# Debug tests
bun run test:debug

# Run specific test file
bun run test tests/mobile-navigation.spec.js
```

## 🏗️ Build for Production

```bash
# Build optimized CSS with Tailwind CLI
bun run build

# Output will be in dist/output.css
```

Then update `base.html` to use the optimized CSS file instead of the CDN version.

## 📁 Project Structure

```
averby_template/
├── base.html                 # Main application (uses CDN Tailwind)
├── index.html               # Production version (for optimized build)
├── package.json             # Bun dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── playwright.config.js     # E2E testing setup
├── src/
│   ├── main.css            # Custom CSS
│   └── input.css           # Tailwind input file
├── dist/                    # Build output (generated)
│   └── output.css          # Optimized Tailwind CSS
├── tests/                   # E2E test files
│   ├── mobile-navigation.spec.js
│   ├── touch-targets.spec.js
│   ├── lazy-loading.spec.js
│   └── visual-polish.spec.js
└── context/
    └── style-guide.md      # Design system documentation
```

## ✨ Features

### Desktop Experience
- **Collapsible navigation rail** - Save screen space on large displays
- Toggle button in top navbar with smooth animations
- State persistence across sessions
- Left drawers adapt to rail state

### Mobile First
- iOS-style bottom navigation on mobile
- Responsive breakpoints for all screen sizes
- Touch-optimized with 44x44px minimum targets

### Performance
- Lazy loading for images
- Skeleton screens during loading
- Optimized Tailwind build for production
- Smooth GPU-accelerated animations

### Accessibility
- WCAG AA compliant
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatible
- Visible focus indicators

### Visual Polish
- Micro-interactions on all buttons
- Backdrop blur effects
- Glass morphism design
- Toast notification stacking
- Smooth transitions throughout

### Developer Experience
- TDD methodology with comprehensive tests
- Bun for fast package management
- Hot reload during development
- Production optimization pipeline

## 🛠️ Development Workflow

1. **Start the dev server**: `bun run serve` (runs on port 8030)
2. **Watch CSS changes**: `bun run dev` (in another terminal)
3. **Write tests first**: Following TDD RED phase
4. **Implement features**: GREEN phase - make tests pass
5. **Refactor**: Improve code while keeping tests green
6. **Build for production**: `bun run build`

## 📊 Test Coverage

- Mobile Navigation: 18 tests ✅
- Touch Targets: 16 tests ✅
- Lazy Loading: 15 tests ✅
- Visual Polish: Multiple tests ✅

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

## 📝 License

MIT

---

Built with Bun 🥟, Tailwind CSS 🎨, and Playwright 🎭