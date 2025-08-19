# Averby Design System Style Guide

Welcome to the official Averby Design System style guide. This document is the single source of truth for our design and communication standards. Its purpose is to ensure consistency, clarity, and quality across all of our products and platforms.

## 1. Introduction

### Our Mission

To empower individuals and organizations with intelligent tools that transform learning into lasting personal and professional growth.

### Our Vision

A world where every person has the opportunity and support to realize their potential and thrive in both life and work.

### How to Use This Guide

This guide is for designers, developers, product managers, and anyone creating user-facing experiences. Use it to align your work with our brand identity and user experience principles. The system is built on Tailwind CSS v4.1 with runtime compilation and uses Inter as the primary typeface with Material Symbols Rounded for iconography.

---

## 2. Brand Identity

### Logo

- **Primary Logo**: The Averby wordmark logo is an SVG-based design featuring the complete "Averby" wordmark in a circular badge format
- **Usage**: Use the full wordmark logo in headers, documentation, and primary brand placements
- **Clear Space**: Maintain minimum 16px (1rem) clear space on all sides of the logo
- **Color Treatment**: The logo uses `currentColor` to automatically adapt to light and dark themes
- **Sizing**: Standard sizes are 40px (2.5rem), 48px (3rem), and 64px (4rem) for different contexts
- **Alternative Versions**: Icon-only version available for compact spaces like favicons

### Tone of Voice

Our brand voice is **Professional**, **Clear**, and **Empowering**.

- **We are**: Direct, helpful, and accessible. We provide clear guidance and empower teams to build confidently.
- **We are not**: Overly technical, condescending, or unnecessarily complex. We avoid jargon that excludes team members.

---

## 3. Visual Design

### Color Palette

Our color system provides semantic meaning and visual hierarchy while maintaining WCAG 2.1 AA accessibility standards.

- **Primary Colors (Orange Scale)**: Used for main brand expression, primary CTAs, and active states

  - `primary-50`: `#FFF7ED` - Lightest tint for backgrounds
  - `primary-100`: `#FFEDD5` - Light backgrounds
  - `primary-200`: `#FED7AA` - Subtle accents
  - `primary-300`: `#FDBA74` - UI elements
  - `primary-400`: `#FB923C` - Hover states
  - `primary-500`: `#F97316` - **Primary brand color**
  - `primary-600`: `#EA580C` - Primary hover/pressed
  - `primary-700`: `#C2410C` - Dark UI elements
  - `primary-800`: `#9A3412` - Darker elements
  - `primary-900`: `#7C2D12` - Darkest elements

- **Accent Colors (Teal Scale)**: Used for secondary CTAs, accents, and complementary elements

  - `accent-50`: `#F0FDFA` through `accent-900`: `#134E4A`
  - **Key Color**: `accent-500`: `#14B8A6`

- **Neutral Colors (Gray Scale)**: Used for text, backgrounds, borders, and structural elements

  - `neutral-50`: `#F9FAFB` - Lightest backgrounds
  - `neutral-100`: `#F3F4F6` - Card backgrounds
  - `neutral-200`: `#E5E7EB` - Borders, dividers
  - `neutral-300`: `#D1D5DB` - Input borders
  - `neutral-400`: `#9CA3AF` - Placeholder text
  - `neutral-500`: `#6B7280` - Secondary text
  - `neutral-600`: `#4B5563` - Body text
  - `neutral-700`: `#374151` - Headings
  - `neutral-800`: `#1F2937` - Dark backgrounds
  - `neutral-900`: `#111827` - Darkest backgrounds

- **Semantic Colors**: For feedback, status indicators, and system communication
  - **Success (Emerald)**: `#10B981` - Success states, confirmations
  - **Warning (Amber)**: `#F59E0B` - Warnings, cautions
  - **Error (Red)**: `#EF4444` - Errors, destructive actions
  - **Info (Sky)**: `#0EA5E9` - Information, neutral notifications

### Typography

**Font Family**: Inter is our primary and only typeface, chosen for its clarity, neutrality, and excellent readability across all sizes and weights.

- **Font Stack**: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Font Features**: `font-feature-settings: 'cv11', 'ss01', 'ss03'` for enhanced readability
- **Rendering**: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`

**Type Scale & Usage**:

- **Heading 1**: 48px, 800 weight, -0.025em tracking - For page titles and major sections
- **Heading 2**: 32px, 700 weight, -0.02em tracking - For section headings
- **Heading 3**: 24px, 600 weight, -0.015em tracking - For subsection headings
- **Heading 4**: 18px, 600 weight, -0.01em tracking - For component headings
- **Body Text**: 15px, 400 weight, 1.6 line-height - For paragraphs and content
- **Caption Text**: 13px, 400 weight, 0.01em tracking - For labels and metadata
- **Small Text**: 11px, 400 weight - For fine print and secondary information

**Interactive Text Styles**:

- **Button Text**: 14px, 600 weight - For all button labels
- **Link Text**: Inherits size, 500 weight - For inline and standalone links
- **Input Labels**: 14px, 500 weight - For form field labels
- **Navigation Text**: 13px, 600 weight - For navigation items

### Iconography

**Icon System**: Material Symbols Rounded with variable font axes for dynamic state changes and enhanced interactivity.

- **Font Family**: `'Material Symbols Rounded'`
- **Default Settings**: `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`
- **Standard Sizes**: 16px, 20px, 24px (most common), 32px, and 48px
- **Interactive States**:
  - **Default**: FILL 0, wght 400 - Outlined style
  - **Hover**: wght 600 - Increased weight on hover
  - **Active/Selected**: FILL 1, wght 600 - Filled with increased weight
  - **Disabled**: wght 300, reduced opacity

**Usage Guidelines**:

- Icons support text and provide visual hierarchy
- Always include accessible labels (aria-label or sr-only text)
- Use consistent sizing within component groups
- Icons adapt automatically with theme changes via `currentColor`
- Progressive loading pattern hides icons until font is ready

### Imagery

**Avatar System**: Consistent user representation with multiple fallback states and responsive sizing.

- **Avatar Sizes**: 24px (xs), 32px (sm), 48px (md), 64px (lg), 80px (xl), 96px (2xl)
- **Fallback Hierarchy**: Photo → Initials → Person icon → Account circle icon
- **Status Indicators**: Online (green), away (amber), offline (neutral) with 8px indicator dots
- **Group Avatars**: Stacked layout with max 4 visible + overflow count
- **Aspect Ratios**: Square (1:1) for avatars, 16:9 for media, 3:4 for portraits

**Image Guidelines**:

- **Loading States**: Skeleton placeholders while images load
- **Error Handling**: Graceful degradation with icon fallbacks
- **Lazy Loading**: For images below the fold
- **Responsive Images**: Multiple sizes with WebP format preferred
- **Alt Text**: Always provide meaningful descriptions for accessibility

---

## 4. UI Components

### Layout and Spacing

**8-Point Grid System**: Our foundation for consistent, harmonious layouts using CSS Grid and Flexbox.

**Spacing Scale**:

- **xs**: 4px (0.25rem) - Fine-tuned spacing
- **sm**: 8px (0.5rem) - Base unit
- **md**: 16px (1rem) - Standard spacing
- **lg**: 24px (1.5rem) - Section spacing
- **xl**: 32px (2rem) - Large spacing
- **2xl**: 48px (3rem) - Section padding
- **3xl**: 64px (4rem) - Page sections
- **4xl**: 96px (6rem) - Major sections

**Responsive Breakpoints**:

- **Mobile**: < 768px (full-width design, bottom navigation)
- **Tablet**: 768px+ (collapsed rail, adaptive layouts)
- **Desktop**: 1024px+ (full features, centered search)
- **Large Desktop**: 1280px+ (wide layouts)

**Container Widths**:

- **Standard**: max-w-7xl (1280px)
- **Wide**: max-w-[90rem] (1440px) - Primary layout container
- **Content**: max-w-3xl (768px) - Reading content
- **Reading**: max-w-2xl (672px) - Narrow text content

### Buttons

**Button System**: Consistent interactive elements with clear hierarchy and accessible states.

**Button Types**:

- **Primary**: `bg-primary-500 text-white hover:bg-primary-600` - Main CTAs, one per page
- **Accent**: `bg-accent-500 text-white hover:bg-accent-600` - Secondary important actions
- **Outline**: `border border-neutral-200 hover:bg-neutral-100` - Secondary actions
- **Ghost**: `hover:bg-neutral-100` - Subtle actions, toolbar buttons
- **Destructive**: `bg-error-500 text-white hover:bg-error-600` - Delete, remove actions

**Button Sizes**:

- **Small**: `h-8 px-3 text-sm` - Compact spaces, table actions
- **Default**: `h-10 px-4 text-sm` - Standard size
- **Large**: `h-12 px-6 text-base` - Prominent actions

**Interactive States**:

- **Default**: Base appearance
- **Hover**: Background color change + subtle scale (1.02x)
- **Active**: Scale down (0.98x) + darker background
- **Focus**: 2px ring with primary-400/60 opacity
- **Disabled**: Reduced opacity (0.5) + cursor not-allowed
- **Loading**: Spinner + "Loading..." text, disabled state

**Touch Targets**: Minimum 44x44px on mobile devices for accessibility

### Forms and Inputs

**Form System**: Accessible, consistent form controls with clear validation states.

**Input Types & Styling**:

- **Text Fields**: `rounded-xl border border-neutral-300 px-4 py-3 focus:ring-2 focus:ring-primary-400/60`
- **Search Fields**: Rounded-full with search icon, often with glass morphism background
- **Textareas**: Same as text fields but with resize handle
- **Select Dropdowns**: Custom arrow icon, same border/padding as text fields
- **File Upload**: Dashed border, upload icon, drag-and-drop zone

**Custom Form Elements**:

- **Checkboxes**: Custom styled with primary-600 background when checked, white checkmark
- **Radio Buttons**: Circular with primary-600 border when selected, inner filled circle
- **Toggle Switches**: Pill-shaped with sliding indicator, primary-500 when active
- **Range Sliders**: Primary-500 track with rounded handle

**Form Validation States**:

- **Default**: neutral-300 border
- **Focus**: primary-400/60 ring, primary-500 border
- **Success**: success-500 border + check icon + green validation message
- **Error**: error-500 border + error icon + red validation message
- **Warning**: warning-500 border + warning icon + amber validation message
- **Loading**: Loading spinner + disabled state
- **Disabled**: neutral-100 background, reduced opacity, not-allowed cursor

**Form Layout Patterns**:

- **Labels**: Above inputs, 14px, 500 weight, neutral-700 color
- **Helper Text**: Below inputs, 12px, neutral-500 color
- **Field Spacing**: 16px between form fields
- **Group Spacing**: 24px between form groups
- **Required Fields**: Red asterisk (\*) after label

### Navigation

**Navigation System**: Multi-pattern navigation supporting desktop and mobile contexts.

**Fixed Vertical Rail (Desktop)**:

- **Width**: 96px (6rem) when expanded, 64px (4rem) when collapsed
- **Position**: Fixed left side, full height
- **Background**: neutral-200 light mode, neutral-900/60 dark mode
- **Items**: Icon + label vertical stacking, 48px minimum touch target
- **Active State**: primary-50/primary-900 background, primary-600/primary-300 text
- **Toggle**: Hamburger menu icon, persists state in localStorage

**Top Navigation Bar**:

- **Height**: 56px (3.5rem)
- **Layout**: Rail toggle + Title + Search + Avatar
- **Background**: neutral-50/70 with backdrop-blur (glass morphism)
- **Search**: Centered on desktop, overlay on mobile
- **Responsive**: Adapts to rail state, hides/shows elements

**Drawer System**:

- **Left Overlay**: 320px width, slides from rail edge with backdrop
- **Right Overlay**: 384px width, slides from screen edge with backdrop
- **Inset Drawer**: 320px width, pushes content (no backdrop)
- **Animation**: 280ms cubic-bezier(0.2, 0.8, 0.2, 1)
- **Backdrop**: bg-neutral-900/40 with backdrop-blur

**Mobile Bottom Navigation**:

- **Height**: 64px (4rem)
- **Items**: 4-5 maximum, icon + label vertical stacking
- **Active State**: primary-600/primary-400 with background tint
- **Touch Targets**: 48x48px minimum
- **Position**: Fixed bottom with safe-area-inset

**Breadcrumbs & Pagination**:

- **Breadcrumbs**: Chevron separators, neutral-400 inactive, primary-600 active
- **Pagination**: Number buttons with prev/next, primary-500 active state

---

## 5. Content Style

### Writing Style

**Voice & Tone**: Professional, clear, and empowering. We communicate directly without jargon.

- **Headings**: Sentence case for all headings and subheadings
- **Lists**: Bullet points (•) for unordered lists, numbered for sequential steps
- **Capitalization**: Sentence case preferred, avoid ALL CAPS except for very short labels
- **Emphasis**: Use **bold** for emphasis, _italics_ for subtle emphasis or foreign words
- **Acronyms**: Spell out on first use: "User Interface (UI)", then "UI" thereafter
- **Punctuation**: Oxford comma always, periods in complete sentences only

### Terminology Glossary

**Interface Terms**:

- "Sign In" (not "Log In")
- "User" (not "Customer" or "Client")
- "Dashboard" (not "Overview" or "Home")
- "Settings" (not "Preferences")
- "Dark Mode" (not "Dark Theme")

**Action Terms**:

- "Create" (not "Add New")
- "Delete" (not "Remove" - unless it's reversible)
- "Edit" (not "Modify")
- "Save" (not "Submit" unless it's a form submission)
- "Cancel" (not "Close" unless closing a dialog)

**Component Terms**:

- "Navigation Rail" (not "Sidebar")
- "Drawer" (not "Panel" or "Sidebar")
- "Toast" (not "Notification" or "Alert" unless it requires action)
- "Card" (not "Tile" or "Block")
- "Badge" (not "Tag" unless it's for tagging content)

---

## 6. Accessibility (A11y)

Our design system is built to be inclusive and accessible to all users. We exceed WCAG 2.1 AA standards.

### Core Accessibility Requirements

**Color & Contrast**:

- **Text Contrast**: 4.5:1 minimum for normal text, 3:1 for large text (18px+ or 14px+ bold)
- **Non-text Contrast**: 3:1 minimum for UI components and graphical elements
- **Color Independence**: Never rely solely on color to convey information
- **Dark Mode**: Equivalent contrast ratios maintained in both themes

**Keyboard Navigation**:

- **Tab Order**: Logical, sequential keyboard navigation flow
- **Focus Indicators**: 2px primary-400 ring around all interactive elements
- **Skip Links**: "Skip to main content" for screen reader users
- **Escape Patterns**: ESC key closes modals, drawers, and dropdowns
- **Arrow Keys**: Navigate within component groups (tabs, menus)

**Screen Reader Support**:

- **Semantic HTML**: Proper heading hierarchy, landmarks, lists
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful descriptions for images, empty alt for decorative
- **Live Regions**: aria-live for dynamic content updates
- **Form Labels**: Every input has an associated label element

**Interactive Standards**:

- **Touch Targets**: Minimum 44x44px on mobile devices
- **Loading States**: Screen reader announcements for async content
- **Error Handling**: Clear, actionable error messages with icon + text
- **Animation**: Respects prefers-reduced-motion system setting

## Interactive Component States

Comprehensive documentation for all interactive states across the Averby design system:

### Button States

**Default State**:

```html
<button
  class="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-4 text-sm font-semibold bg-primary-500 text-neutral-50"
>
  New Program
</button>
```

**Hover State**:

- **Color Change**: Primary buttons darken by one scale step (primary-500 → primary-600)
- **Subtle Scale**: Transform scale(1.02) for enhanced tactile feedback
- **Transition**: `transition-all duration-150` for smooth state changes

```html
<button
  class="... hover:bg-primary-600 hover:scale-[1.02] transition-all duration-150"
></button>
```

**Active State (Pressed)**:

- **Scale Down**: Transform scale(0.98) for pressed feedback
- **Color**: Even darker background for clear interaction confirmation

```html
<button class="... active:scale-[0.98]"></button>
```

**Focus State**:

- **Ring**: 2px ring with primary-400 at 60% opacity
- **No Outline**: Remove default browser outline
- **Keyboard Navigation**: Clearly visible for accessibility

```html
<button
  class="... focus:outline-none focus:ring-2 focus:ring-primary-400/60"
></button>
```

**Disabled State**:

- **Opacity**: Reduced to 0.5 for visual indication
- **Cursor**: `cursor-not-allowed` to prevent interaction
- **No Hover Effects**: Disabled styles override hover states

```html
<button
  disabled
  class="... disabled:opacity-50 disabled:cursor-not-allowed"
></button>
```

**Loading State**:

- **Spinner**: Inline loading spinner with consistent sizing
- **Text Change**: "Loading..." or contextual message
- **Disabled**: Prevent multiple submissions

```html
<button disabled class="... flex items-center gap-2">
  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">...</svg>
  Loading...
</button>
```

### Form Input States

**Default State**:

```html
<input
  class="rounded-xl border border-neutral-300 px-4 py-3 focus:ring-2 focus:ring-primary-400/60"
/>
```

**Focus State**:

- **Ring**: Primary color ring for clear focus indication
- **Border**: Changes to primary-500 for enhanced visibility

```html
<input
  class="... focus:border-primary-500 focus:ring-2 focus:ring-primary-400/60"
/>
```

**Error State**:

- **Border**: Red border with error-500 color
- **Icon**: Error icon within the input field
- **Message**: Clear error text below input

```html
<div class="space-y-1">
  <input class="... border-error-500 focus:ring-error-400/60" />
  <p class="text-sm text-error-600 flex items-center gap-1">
    <span class="material-symbols-rounded text-sm">error</span>
    This field is required
  </p>
</div>
```

**Success State**:

- **Border**: Green border with success-500 color
- **Icon**: Success checkmark icon
- **Message**: Confirmation text

```html
<div class="space-y-1">
  <input class="... border-success-500 focus:ring-success-400/60" />
  <p class="text-sm text-success-600 flex items-center gap-1">
    <span class="material-symbols-rounded text-sm">check_circle</span>
    Looks good!
  </p>
</div>
```

**Disabled State**:

```html
<input disabled class="... bg-neutral-100 cursor-not-allowed opacity-75" />
```

### Navigation States

**Rail Navigation Items**:

**Default State**:

```html
<button
  class="group flex flex-col items-center justify-center text-center rounded-xl px-2 py-3 text-[13px] font-semibold text-neutral-700 dark:text-neutral-200 transition-all duration-150 min-h-[48px] min-w-[48px]"
></button>
```

**Hover State**:

- **Background**: Subtle overlay (neutral-900/5 light, neutral-700/40 dark)
- **Icon Weight**: Material Symbols font-weight increases to 600

```html
<button
  class="... hover:bg-neutral-900/5 dark:hover:bg-neutral-700/40"
></button>
```

**Active/Selected State**:

- **Background**: Primary tinted background
- **Text Color**: Primary brand color
- **Icon**: Filled variant with increased weight

```html
<button
  aria-current="page"
  class="... bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300"
>
  <span class="material-symbols-rounded ... " data-filled="true"
    >dashboard</span
  >
</button>
```

### Card States

**Default State**:

```html
<article
  class="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-5 shadow-sm"
></article>
```

**Hover State**:

- **Shadow**: Elevation increase with enhanced shadow
- **Transition**: Smooth shadow transition over 200ms

```html
<article class="... hover:shadow-lg transition-shadow duration-200"></article>
```

### Loading States

**Skeleton Screens**:

- **Background**: Neutral-200/300 base with subtle animation
- **Dimensions**: Match content being loaded
- **Animation**: Gentle pulse effect

```html
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
  <div class="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
</div>
```

**Progress Indicators**:

```html
<div class="w-full bg-neutral-200 rounded-full h-2.5 dark:bg-neutral-700">
  <div
    class="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
    style="width: 45%"
  ></div>
</div>
```

### Implementation Guidelines

**Component Checklist**:

- Semantic HTML structure with proper ARIA attributes
- Keyboard navigation and focus management
- Screen reader testing with VoiceOver (macOS) or NVDA (Windows)
- Color contrast validation for all states
- Mobile touch target verification

### Enhanced Accessibility Testing

**Testing Procedures**:

1. **Keyboard Navigation Testing**:

   ```bash
   # Test sequence:
   Tab → Navigate through interactive elements
   Shift+Tab → Reverse navigation
   Enter/Space → Activate buttons and links
   ESC → Close modals, drawers, and dropdowns
   Arrow keys → Navigate within component groups
   ```

2. **Screen Reader Testing**:

   - **VoiceOver (macOS)**: Cmd+F5 to activate
   - **NVDA (Windows)**: Free download from nvaccess.org
   - **JAWS (Windows)**: Professional screen reader
   - **Testing checklist**:
     - All content is announced properly
     - Form labels are associated correctly
     - Live regions announce dynamic changes
     - Navigation landmarks are identified

3. **Color Contrast Verification**:
   ```bash
   # Tools for testing:
   - WebAIM Contrast Checker (webaim.org/resources/contrastchecker/)
   - Colour Contrast Analyser (CCA)
   - Chrome DevTools Lighthouse
   - axe-core browser extension
   ```

**ARIA Pattern Examples**:

**Modal Dialog**:

```html
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <h2 id="modal-title">Dialog Title</h2>
  <p id="modal-description">Dialog description</p>
  <button aria-label="Close dialog">×</button>
</div>
```

**Tab Navigation**:

```html
<nav role="tablist" aria-label="Main navigation">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Dashboard
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Content
  </button>
</nav>
<div role="tabpanel" aria-labelledby="tab1" id="panel1">Panel 1 content</div>
```

**Form Validation**:

```html
<div>
  <label for="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid="true"
  />
  <div id="email-error" role="alert" class="text-error-600">
    Please enter a valid email address
  </div>
</div>
```

**Live Regions for Toast Notifications**:

```html
<div id="toastRegion" class="fixed inset-0 pointer-events-none z-[60]">
  <ol
    id="toasts"
    class="absolute top-4 right-4"
    role="region"
    aria-label="Notifications"
    aria-live="polite"
  ></ol>
</div>
```

**Focus Management for SPAs**:

```javascript
// Focus management for navigation
function navigateToPage(pageName) {
  // Update content
  updatePageContent(pageName);

  // Move focus to main content or page heading
  const mainHeading = document.querySelector('h1, h2, [role="main"] h1');
  if (mainHeading) {
    mainHeading.focus();
    mainHeading.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
```

**Keyboard Navigation Maps**:

**Desktop Rail Navigation**:

- **Tab**: Focus rail toggle → Search → Avatar menu → Rail items → Main content
- **Shift+Tab**: Reverse order navigation
- **Enter/Space**: Activate rail items and toggle buttons
- **ESC**: Close drawers and overlays

**Mobile Bottom Navigation**:

- **Tab**: Sequential navigation through tab items
- **Left/Right Arrow**: Navigate between tabs (optional enhancement)
- **Enter/Space**: Activate tab navigation

**Drawer Focus Trap**:

```javascript
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

---

## 7. Resources

### Design Assets & Tools

**Live Style Guide**:

- Interactive component library at `/style-guide.html`
- Copy-paste code examples with Tailwind classes
- Color swatches with hex values and CSS variables
- Typography specimens with exact specifications

**Typography Resources**:

- **Inter Font**: Available via Google Fonts CDN
- **Material Symbols Rounded**: Icon font with variable axes
- **Font Features**: cv11, ss01, ss03 for enhanced readability

**Development Tools**:

- **Tailwind CSS v4.1**: Runtime compilation for rapid development
- **CSS Custom Properties**: Full design token system
- **Dark Mode**: Class-based implementation with system preference detection
- **Responsive Design**: Mobile-first approach with defined breakpoints

**Component Architecture**:

- Vanilla JavaScript for interactions (no framework dependencies)
- Progressive enhancement patterns
- ARIA-compliant implementation
- Theme-aware component states

### Browser Support

**Modern Browser Support**:

- Chrome 90+ (Chromium-based browsers)
- Firefox 88+
- Safari 14+
- Edge 90+

**Progressive Enhancement**:

- Core functionality works without JavaScript
- CSS Grid with Flexbox fallbacks
- Custom properties with fallback values
- Graceful degradation for older browsers

### Performance Guidelines

**Core Web Vitals Targets**:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Optimization Strategies**:

- Font loading optimization with preload directives
- Icon font progressive enhancement
- Lazy loading for below-fold images
- Efficient CSS with Tailwind's runtime compilation

## Enhanced Animation Guidelines

Detailed motion design documentation with specific timing functions and performance considerations:

### Timing Functions & Durations

**Micro-interactions (150ms)**:

- **Usage**: Button hovers, icon state changes, small UI feedback
- **Easing**: `ease-out` for natural deceleration
- **Properties**: `background-color`, `color`, `transform`, `opacity`

```css
.btn-primary {
  transition: transform 0.15s ease-out, background-color 0.15s ease-out,
    color 0.15s ease-out;
}
```

**Standard Transitions (200-280ms)**:

- **Usage**: Card shadows, focus states, drawer animations
- **Easing**: `ease-out` for entrances, `ease-in-out` for transforms

```css
.card {
  transition: box-shadow 0.2s ease-out;
}

.drawer-slide {
  transition-duration: 280ms;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

**Complex Animations (300ms)**:

- **Usage**: Toast notifications, modal overlays, page transitions
- **Easing**: Custom cubic-bezier for smooth, natural movement

```css
.toast {
  transition: all 0.3s ease-out;
}
```

**Specific Cubic Bezier Values**:

- **Drawer slides**: `cubic-bezier(0.2, 0.8, 0.2, 1)` - Smooth, slightly bouncy
- **Modal scales**: `cubic-bezier(0.32, 0.72, 0, 1)` - Quick start, smooth finish
- **Toast slides**: `ease-out` - Simple, effective for notifications

### Performance Considerations

**Hardware Acceleration**:

```css
/* Force hardware acceleration for smooth animations */
.drawer-slide {
  will-change: transform;
  transform: translateZ(0);
}

/* Remove will-change after animation completes */
.drawer-slide.animation-complete {
  will-change: auto;
}
```

**Efficient Properties**:

- **Prefer**: `transform`, `opacity` (GPU accelerated)
- **Avoid**: `width`, `height`, `top`, `left` (triggers layout)

```css
/* Good - GPU accelerated */
.slide-in {
  transform: translateX(0);
  opacity: 1;
}

/* Avoid - triggers layout */
.slide-in {
  left: 0;
  width: 320px;
}
```

### Accessibility Considerations

**Reduced Motion Support**:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01s !important;
    animation-duration: 0.01s !important;
    animation-iteration-count: 1 !important;
  }
}
```

**Implementation in Components**:

```javascript
// Check user preference before animating
function shouldAnimate() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function openDrawer(drawer) {
  if (shouldAnimate()) {
    drawer.style.transition = "transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1)";
  } else {
    drawer.style.transition = "none";
  }
  drawer.classList.add("open");
}
```

### Specific Animation Examples

**Button Press Animation**:

```css
.btn {
  transform: scale(1);
  transition: transform 0.15s ease-out;
}

.btn:active {
  transform: scale(0.98);
}

.btn:hover {
  transform: scale(1.02);
}
```

**Card Hover Elevation**:

```css
.card {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  transition: box-shadow 0.2s ease-out;
}

.card:hover {
  box-shadow: 0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
}
```

**Material Symbols Icon Weight Transition**:

```css
.material-symbols-rounded {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  transition: font-variation-settings 0.2s ease;
}

.nav-item:hover .material-symbols-rounded {
  font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 24;
}

.nav-item[aria-current="page"] .material-symbols-rounded {
  font-variation-settings: "FILL" 1, "wght" 600, "GRAD" 0, "opsz" 24;
}
```

**Drawer Slide Animations**:

```css
/* Left overlay drawer */
.drawer-left {
  transform: translateX(-100%);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.drawer-left.open {
  transform: translateX(0);
}

/* Right overlay drawer */
.drawer-right {
  transform: translateX(100%);
  transition: transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.drawer-right.open {
  transform: translateX(0);
}

/* Inset drawer (compresses content) */
.drawer-inset {
  width: 0;
  transition: width 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.drawer-inset.open {
  width: 320px;
}
```

**Toast Notification Animation**:

```css
.toast {
  transform: translateY(-100%) scale(0.95);
  opacity: 0;
  transition: all 0.3s ease-out;
}

.toast.show {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.toast.hide {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}
```

### Loading State Animations

**Skeleton Pulse**:

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Spinner Animation**:

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

## 8. Component Specifications

### Cards & Panels

**Card System**: Consistent content containers with semantic background variations.

- **Default Card**: `bg-white dark:bg-neutral-950` - Primary content
- **Subtle Card**: `bg-neutral-50 dark:bg-neutral-900` - Secondary content
- **Elevated Card**: `bg-neutral-100 dark:bg-neutral-800` - Highlighted content
- **Glass Card**: `bg-white/70 backdrop-blur dark:bg-neutral-950/70` - Overlays
- **Standard Radius**: `rounded-2xl` (16px) for all cards
- **Shadow System**: `shadow-sm hover:shadow-lg transition-shadow duration-200`
- **Border Treatment**: `border border-neutral-200 dark:border-neutral-800`

### Tables & Data Display

**Table Patterns**: Responsive data presentation with consistent styling.

- **Basic Table**: Standard borders, neutral backgrounds, hover states
- **Striped Table**: Alternating row backgrounds for better readability
- **Compact Table**: Reduced padding for data-dense layouts
- **Sortable Headers**: Interactive column headers with sort indicators
- **Mobile Strategy**: Transform to card layout below 768px breakpoint
- **Loading States**: Skeleton loaders with consistent dimensions
- **Empty States**: Centered illustration + message + action button

### Status & Feedback

**Toast Notifications**: ARIA-compliant messaging system with glass morphism.

- **Glass Background**: Semi-transparent with backdrop blur effects
- **Semantic Colors**: Success (emerald), Error (red), Warning (amber), Info (sky)
- **Auto-dismiss**: 4-second timeout, user can dismiss manually
- **Stacking**: Maximum 3 toasts, oldest removed when exceeding limit
- **Animation**: 300ms ease-out slide + fade transitions
- **Position**: Fixed top-right with appropriate z-index (60)

**Status Badges**: Semantic color coding for various states.

- **Live**: Primary green background
- **Draft**: Neutral gray background
- **Pending**: Warning amber background
- **Inactive**: Error red background
- **Pill Shape**: `rounded-full px-3 py-1.5` with appropriate contrast

---

## 9. Animation & Motion

### Motion Principles

**Purposeful Animation**: Smooth, meaningful transitions that enhance user experience.

- **Duration Standards**: 150ms (hover), 200ms (standard), 300ms (complex), 500ms (page transitions)
- **Easing Functions**: `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for transforms
- **Cubic Bezier**: `cubic-bezier(0.2, 0.8, 0.2, 1)` for drawer animations
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` system setting

**Interactive Micro-animations**:

- **Button Press**: Scale down to 0.98 on active state
- **Hover Lift**: Subtle scale up (1.02) + shadow enhancement for cards
- **Icon Weight Change**: Material Symbols font-weight transitions on hover
- **Loading States**: Subtle pulse animation for skeleton loaders

**Page Transitions**:

- **Drawer Slides**: 280ms slide animations with backdrop fade
- **Modal Overlays**: Scale + fade animation (0.95 to 1.0 scale)
- **Toast Notifications**: Slide down from top-right with fade
- **Mobile Navigation**: Bottom-up slide for overlays

---

## 10. Dark Mode Implementation

### Theme System

**Class-based Dark Mode**: Systematic approach to theme switching with user preference persistence.

- **Implementation**: `dark:` Tailwind variant applied to `<html>` element
- **Theme Detection**: JavaScript detects system preference and localStorage override
- **Color Scheme Sync**: CSS `color-scheme` property synced with theme state
- **Persistence**: User choice saved in localStorage, system preference as fallback

**Color Adaptations**:

- **Backgrounds**: Light backgrounds become dark neutrals (white → neutral-950)
- **Text**: Dark text becomes light (neutral-900 → neutral-100)
- **Borders**: Light borders become dark (neutral-200 → neutral-800)
- **Interactive States**: Hover/focus colors adapt while maintaining contrast
- **Brand Colors**: Primary/accent colors remain consistent across themes

**Component Considerations**:

- **Glass Effects**: Transparency values adjusted for dark backgrounds
- **Shadows**: Reduced or removed in dark mode for better contrast
- **Images**: SVG icons use `currentColor` for automatic theme adaptation
- **Form Elements**: Input backgrounds and borders adapt to theme

### Implementation Code Pattern

```css
/* Light mode default */
.component {
  background-color: white;
  color: #111827;
  border-color: #e5e7eb;
}

/* Dark mode override */
.dark .component {
  background-color: #0f172a;
  color: #f8fafc;
  border-color: #334155;
}
```

## Component-Specific Responsive Behavior

Detailed documentation of how each component adapts across different viewport sizes:

### Navigation Rail Responsive Behavior

**Desktop (1024px+)**:

- **Width**: 96px (6rem) expanded, 64px (4rem) collapsed
- **Visibility**: Always visible as fixed sidebar
- **Toggle**: Hamburger menu collapses to icon-only view
- **Labels**: Show/hide based on collapse state

```css
#desktopRail {
  @media (min-width: 1024px) {
    display: flex;
    width: 6rem;
    position: fixed;
  }
}

#desktopRail[data-collapsed="true"] {
  width: 4rem;
}
```

**Tablet (768px - 1023px)**:

- **Collapsed by default**: Space optimization for medium screens
- **Overlay mode**: Covers content when expanded
- **Touch-friendly**: Larger touch targets maintained

**Mobile (< 768px)**:

- **Hidden**: Rail completely hidden on mobile
- **Replaced by**: Bottom tab navigation
- **Alternative access**: Hamburger menu in header for additional options

### Drawer System Responsive Behavior

**Left Overlay Drawer**:

```css
/* Desktop */
@media (min-width: 1024px) {
  .drawer-left {
    width: 320px;
    left: 6rem; /* Accounts for rail width */
  }
}

/* Mobile */
@media (max-width: 767px) {
  .drawer-left {
    width: 320px;
    left: 0;
  }
}
```

**Right Overlay Drawer**:

- **Desktop**: 384px width, slides from right edge
- **Tablet**: 320px width, adjusted for smaller screens
- **Mobile**: Full width minus 32px margin (calc(100vw - 2rem))

**Inset Drawer** (Desktop only):

- **Compresses content**: Main content area adjusts width
- **Not available**: On mobile/tablet (would break layout)

### Search Component Responsive Behavior

**Desktop (1280px+)**:

- **Centered**: Search bar in header center
- **Max width**: 576px (max-w-xl)
- **Always visible**: Persistent in header

```html
<div class="hidden lg:flex flex-1 justify-center items-center px-8">
  <label class="relative block w-full max-w-xl">
    <input
      class="w-full rounded-full pl-10 pr-4 bg-neutral-100/80"
      style="height: 48px;"
    />
  </label>
</div>
```

**Tablet/Mobile (< 1280px)**:

- **Search button**: Replaces search bar
- **Overlay mode**: Full-screen search when activated
- **Slide animation**: Smooth transition from header

```html
<div
  data-search-overlay
  class="fixed inset-x-0 top-0 h-14 bg-white z-50 lg:hidden"
>
  <input class="w-full h-11 rounded-full pl-10 pr-4" />
</div>
```

### Cards Responsive Grid Behavior

**Desktop (1280px+)**:

- **3 columns**: `grid-cols-3` for optimal content density
- **Fixed spacing**: 24px gap between cards

**Tablet (768px - 1279px)**:

- **2 columns**: `grid-cols-2` for balanced layout
- **Maintained spacing**: Same 24px gap

**Mobile (< 768px)**:

- **Single column**: `grid-cols-1` for optimal readability
- **Reduced padding**: Adjust card internal spacing

```html
<section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"></section>
```

### Table Responsive Patterns

**Desktop Tables**:

```html
<table class="w-full">
  <thead>
    <tr class="border-b border-neutral-200 dark:border-neutral-800">
      <th class="text-left py-3 px-4 font-semibold text-sm">Program</th>
      <th class="text-left py-3 px-4 font-semibold text-sm">Status</th>
      <th class="text-left py-3 px-4 font-semibold text-sm">Participants</th>
      <th class="text-right py-3 px-4 font-semibold text-sm">Actions</th>
    </tr>
  </thead>
</table>
```

**Mobile Card Transform**:

```html
<!-- Mobile: Transform to card layout -->
<div class="md:hidden space-y-4">
  <div class="bg-white dark:bg-neutral-900 rounded-xl p-4 border">
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold">Program Name</h3>
      <span
        class="px-2 py-1 rounded-full text-xs bg-success-100 text-success-700"
        >Live</span
      >
    </div>
    <p class="text-sm text-neutral-600 dark:text-neutral-400">
      142 participants
    </p>
    <div class="mt-3 flex gap-2">
      <button class="text-sm text-primary-600">Edit</button>
      <button class="text-sm text-neutral-600">View</button>
    </div>
  </div>
</div>
```

### Form Responsive Layout

**Desktop Forms**:

```html
<div class="grid grid-cols-2 gap-6">
  <div>
    <label class="block text-sm font-medium mb-2">First Name</label>
    <input class="w-full rounded-xl px-4 py-3" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-2">Last Name</label>
    <input class="w-full rounded-xl px-4 py-3" />
  </div>
</div>
```

**Mobile Forms**:

```html
<div class="space-y-6">
  <div>
    <label class="block text-sm font-medium mb-2">First Name</label>
    <input
      class="w-full rounded-xl px-4 py-3 text-16"
      style="font-size: 16px;"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-2">Last Name</label>
    <input
      class="w-full rounded-xl px-4 py-3 text-16"
      style="font-size: 16px;"
    />
  </div>
</div>
```

**Mobile Input Zoom Prevention**:

```css
/* Prevent zoom on iOS when input is focused */
@media screen and (max-width: 767px) {
  input,
  select,
  textarea {
    font-size: 16px !important;
  }
}
```

### Typography Responsive Scale

**Responsive Headings**:

```html
<!-- Page titles -->
<h1 class="text-xl md:text-2xl font-bold tracking-tight">Dashboard</h1>

<!-- Section headings -->
<h2 class="text-lg md:text-xl font-semibold">Recent Activity</h2>

<!-- Subsection headings -->
<h3 class="text-base md:text-lg font-medium">Program Details</h3>
```

**Responsive Body Text**:

```html
<!-- Description text -->
<p class="text-sm md:text-base text-neutral-600">
  Quick insight into usage, programs, and actions.
</p>
```

### Mobile-Specific Optimizations

**Touch Target Minimum**:

```css
@media (max-width: 767px) {
  button {
    min-width: 48px !important;
    min-height: 48px !important;
  }
}
```

**Safe Area Support**:

```css
.mobile-bottom-tabs {
  padding-bottom: env(safe-area-inset-bottom);
}
```

**Viewport Configuration**:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
/>
```

## Enhanced Code Examples

Copy-paste ready code snippets for common component implementations:

### Button Variations

**Primary Button**:

```html
<button
  class="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-4 text-sm font-semibold bg-primary-500 text-neutral-50 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400/60 transition-all duration-150 active:scale-[0.98]"
>
  <span class="material-symbols-rounded text-lg">add</span>
  New Program
</button>
```

**Outline Button**:

```html
<button
  class="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-4 text-sm font-semibold border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400/60 transition-all duration-150 active:scale-[0.98]"
>
  Export Data
</button>
```

**Destructive Button**:

```html
<button
  class="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-4 text-sm font-semibold bg-error-500 text-white hover:bg-error-600 focus:outline-none focus:ring-2 focus:ring-error-400/60 transition-all duration-150 active:scale-[0.98]"
>
  <span class="material-symbols-rounded text-lg">delete</span>
  Delete Program
</button>
```

### Form Components

**Input Field with Label**:

```html
<div class="space-y-2">
  <label
    for="program-name"
    class="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
    >Program Name</label
  >
  <input
    id="program-name"
    type="text"
    placeholder="Enter program name"
    class="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:border-primary-500"
  />
</div>
```

**Select Dropdown**:

```html
<div class="space-y-2">
  <label
    for="status"
    class="block text-sm font-medium text-neutral-700 dark:text-neutral-200"
    >Status</label
  >
  <select
    id="status"
    class="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:border-primary-500"
  >
    <option value="draft">Draft</option>
    <option value="live">Live</option>
    <option value="archived">Archived</option>
  </select>
</div>
```

### Toast Notification Implementation

**JavaScript Toast Function**:

```javascript
function createToast({ title, message, variant = "info", timeout = 4000 }) {
  const toast = document.createElement("li");
  toast.className = `
    bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700
    p-4 max-w-sm w-full transform transition-all duration-300 ease-out
    translate-y-[-100%] opacity-0 scale-95
    data-[open=true]:translate-y-0 data-[open=true]:opacity-100 data-[open=true]:scale-100
  `;

  const variantStyles = {
    success: "border-l-4 border-l-success-500",
    error: "border-l-4 border-l-error-500",
    warning: "border-l-4 border-l-warning-500",
    info: "border-l-4 border-l-info-500",
  };

  toast.classList.add(variantStyles[variant]);

  toast.innerHTML = `
    <div class="flex items-start gap-3">
      <span class="material-symbols-rounded text-${variant}-500 flex-shrink-0">
        ${
          variant === "success"
            ? "check_circle"
            : variant === "error"
            ? "error"
            : variant === "warning"
            ? "warning"
            : "info"
        }
      </span>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-neutral-900 dark:text-neutral-100">${title}</h4>
        ${
          message
            ? `<p class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">${message}</p>`
            : ""
        }
      </div>
      <button class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 flex-shrink-0">
        <span class="material-symbols-rounded text-lg">close</span>
      </button>
    </div>
  `;

  const toastContainer = document.getElementById("toasts");
  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.dataset.open = "true";
  });

  // Auto-dismiss
  if (timeout > 0) {
    setTimeout(() => {
      toast.dataset.open = "false";
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  }

  return toast;
}
```

### Theme Switching Implementation

**Complete Theme Toggle**:

```javascript
function initializeTheme() {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const mobileThemeToggle = document.getElementById("mobileThemeToggle");

  function getStoredTheme() {
    return localStorage.getItem("theme");
  }

  function setStoredTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;

    // Update toggle button states
    [themeToggle, mobileThemeToggle].forEach((btn) => {
      if (btn) {
        btn.setAttribute("aria-pressed", theme === "dark");
        const icon = btn.querySelector(".material-symbols-rounded");
        if (icon) {
          icon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
        }
      }
    });
  }

  function toggleTheme() {
    const currentTheme = root.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  }

  // Initialize theme
  const storedTheme = getStoredTheme();
  const initialTheme = storedTheme || getSystemTheme();
  applyTheme(initialTheme);

  // Bind event listeners
  [themeToggle, mobileThemeToggle].forEach((btn) => {
    if (btn) btn.addEventListener("click", toggleTheme);
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeTheme);
```

This comprehensive style guide provides the foundation for consistent, accessible, and beautiful user interfaces across the Averby platform. Every component is designed to work seamlessly across all devices and user contexts, ensuring a unified experience that scales from mobile phones to large desktop displays.
