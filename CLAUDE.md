# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Averby Admin Console template - a modern, responsive web application built with Tailwind CSS (via CDN runtime) and vanilla JavaScript. The interface follows Material Design 3 principles with a custom design system.

## Architecture

### Structure
- **base.html**: Single-page application with all components inline
- **src/main.css**: Minimal custom CSS (most styling via Tailwind runtime)
- **context/style-guide.md**: Comprehensive visual design guidelines

### Key Components
- **Fixed Vertical Rail**: 6rem wide navigation sidebar with icon+label pattern
- **Drawers**: Three types - left overlay, right overlay, and inset (compresses content)
- **Toast System**: ARIA-compliant notification system with glass morphism
- **Theme System**: Dark/light mode with system preference detection

## Development Commands

This project uses **Bun** as the JavaScript runtime and package manager.

### Quick Start - Automatic Launch
```bash
# One-command launch (installs deps, starts server, opens browser)
./launch.sh

# Or using Bun/npm style:
bun start
```

### Launch Options
```bash
# Standard launch with browser
./launch.sh                  # or: bun start

# Launch without opening browser
./launch.sh --no-browser      # or: bun start:no-browser

# Build CSS then launch
./launch.sh --build           # or: bun start:build

# Launch and run tests
./launch.sh --test

# Show all options
./launch.sh --help
```

### Manual Setup & Development
```bash
# Install dependencies (if not using launch script)
bun install

# Start server manually
bun run serve

# In another terminal, watch CSS changes with Tailwind
bun run dev
```

### Testing
```bash
# Run all E2E tests with Playwright
bun run test

# Run tests with UI mode for debugging
bun run test:ui

# Debug specific tests
bun run test:debug

# Run specific test file
bun run test tests/mobile-navigation.spec.js
```

### Production Build
```bash
# Build optimized CSS with Tailwind CLI
bun run build

# Creates dist/output.css (37KB minified)
# Update base.html to use dist/output.css instead of CDN for production
```

## Design System

### Color Palette
- **Primary**: Orange scale (`--color-primary-*`)
- **Accent**: Teal scale (`--color-accent-*`)
- **Neutral**: Gray scale (`--color-neutral-*`)
- **Status**: Success (emerald), Error (red), Warning (amber), Info (sky)

### Component Patterns
- **Buttons**: `btn-primary`, `btn-outline` utilities
- **Cards**: Rounded-2xl with subtle shadows and hover states
- **Chips**: Status indicators with semantic colors
- **Inputs**: Rounded-xl with focus rings

### Icons
Material Symbols Rounded with variable font axes (FILL, wght, GRAD, opsz) for state changes

### Motion
- Drawers: 280ms cubic-bezier(.2, .8, .2, 1)
- Toasts: 300ms ease-out with translate+fade

## Important Guidelines

### Accessibility
- All interactive elements must have proper ARIA attributes
- Focus indicators must be visible (primary ring)
- Maintain WCAG AA contrast ratios (4.5:1 normal text)
- Use semantic HTML and proper heading hierarchy

### Theme Implementation
- Class-based dark mode on `<html class="dark">`
- Color-scheme CSS property synced with theme
- Icons adapt via `currentColor`
- Respect system preferences unless user overrides

### Performance
- Icons hidden until font loads (data-icons-ready pattern)
- Tailwind loaded via CDN with browser runtime
- Theme script runs before paint to prevent flash

### JavaScript Patterns
- Minimal vanilla JS for interactions
- Data attributes for state (`data-open="true"`)
- Event delegation where possible
- Transition listeners for cleanup

## Visual Development

When making UI changes:
1. Review `/context/style-guide.md` for design principles
2. Test in both light and dark modes
3. Verify all interactive states (hover, focus, active)
4. Check accessibility with keyboard navigation
5. Test responsive behavior at mobile/tablet/desktop breakpoints

## Testing Approach

Since this is a static template:
- Manual testing in multiple browsers
- Visual regression testing if needed
- Accessibility testing with screen readers
- Performance testing with Lighthouse

## Recent Fixes

- **Rail Toggle Visual Collapse**: Fixed issue where rail wouldn't visually collapse despite data attributes updating. Added CSS with `!important` flags to override Tailwind classes.
- **Avatar Blur Effect**: Removed unintended loading class from avatar button
- **Extra Symbol**: Removed duplicate ">" character from rail element

## Known Issues

None at this time.