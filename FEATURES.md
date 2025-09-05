# Features Documentation

This document provides a comprehensive overview of all features and functionality implemented in the Averby Design System template application.

## Table of Contents

1. [Navigation System](#navigation-system)
2. [Drawer Systems](#drawer-systems)  
3. [Top Bar & Header](#top-bar--header)
4. [Theme System](#theme-system)
5. [Toast & Notification System](#toast--notification-system)
6. [Interactive Elements](#interactive-elements)
7. [Responsive Behavior](#responsive-behavior)
8. [Visual Design Elements](#visual-design-elements)
9. [Accessibility Features](#accessibility-features)

---

## Navigation System

### Desktop Navigation Rail

**Primary Navigation Interface for Medium+ Screens (768px+)**

- **Fixed Vertical Sidebar**: 6rem (96px) wide when expanded, collapses to icon-only view
- **Logo Placement**: Centered at top with adaptive sizing (40px standard)
- **Navigation Items**: Icon + label pattern with hover states and active indicators
- **Toggle Functionality**: Rail can be collapsed/expanded via dedicated toggle button
- **Data Attributes**: Uses `data-rail-collapsed` for state management
- **Smooth Transitions**: 280ms cubic-bezier animations for expand/collapse

**Key Features:**
- Icon-first design with Material Symbols Rounded icons
- Consistent 44px touch target sizing for accessibility
- Primary color indicators for active navigation states
- Hover states with neutral background overlays
- Semantic HTML with proper `aria-label` attributes

### Mobile Bottom Navigation

**Touch-First Navigation for Small Screens (<768px)**

- **Fixed Bottom Position**: Persistent bottom navigation bar
- **4-Item Layout**: Optimal thumb-reach positioning
- **Submenu Support**: Bottom sheet-style submenus slide up from bottom
- **Touch Targets**: Minimum 44px for accessibility compliance
- **Responsive Icons**: Filled state for active items, outline for inactive

**Mobile Submenu System:**
- **Bottom Sheet Pattern**: Submenus slide up from bottom edge
- **Backdrop Overlay**: Semi-transparent scrim with touch-to-dismiss
- **Smooth Animation**: 300ms ease-out slide transitions
- **Body Scroll Lock**: Prevents background scrolling during submenu interaction
- **Safe Area Handling**: Respects device safe areas and notches

### Navigation State Management

- **Unified Logic**: Single navigation handler manages both desktop and mobile patterns
- **Data-Driven Configuration**: Navigation items defined in JavaScript configuration
- **State Persistence**: Rail collapse state remembered between sessions
- **Responsive Switching**: Seamless transition between navigation patterns at breakpoints

---

## Drawer Systems

The application implements multiple drawer patterns for different use cases and screen sizes.

### Left Overlay Drawer (Desktop Submenu)

**Purpose**: Desktop submenu system for complex navigation hierarchies

- **Positioning**: Fixed overlay from left edge
- **Width**: 22rem (352px) with 85vw max-width constraint
- **Animation**: Slide-in from left with 280ms cubic-bezier easing
- **Backdrop**: Semi-transparent scrim with click-to-dismiss
- **Content**: Hierarchical menu structure with nested categories
- **Z-Index**: 40 for proper layering

**Interaction Patterns:**
- Opens via navigation item clicks (desktop only)
- Closes via backdrop tap, ESC key, or close button
- Proper focus management and trap
- Smooth backdrop blur effect

### Right Overlay Drawer

**Purpose**: Secondary actions, filters, and supplementary content

- **Positioning**: Fixed overlay from right edge  
- **Width**: 28rem (448px) with 92vw max-width constraint
- **Content Areas**: Form controls, filter options, secondary actions
- **Rounded Corners**: Left-side rounding (tl-2xl, bl-2xl)
- **Glass Morphism**: Backdrop blur with subtle transparency

**Typical Use Cases:**
- Advanced filtering interfaces
- Settings and preferences
- Secondary form inputs
- Export/import functions

### Inset Drawer

**Purpose**: Content that compresses main layout (like Google Fonts sidebar)

- **Behavior**: Pushes main content instead of overlaying
- **Width Animation**: Smooth width transitions with `will-change: width`
- **Responsive**: Automatically handles content reflow
- **Scroll Handling**: Independent scrolling with stable scrollbar gutters
- **Background**: Subtle neutral background with border

### Bottom Sheet (Mobile Submenu)

**Purpose**: Mobile-specific submenu system

- **Slide-Up Animation**: Enters from bottom edge of screen
- **Dynamic Height**: Content-driven height with viewport constraints
- **Safe Area Support**: Respects device-specific safe areas
- **Touch Gestures**: Swipe-down to dismiss capability
- **Backdrop Management**: Prevents body scrolling during interaction

**Technical Implementation:**
- Uses CSS transforms for hardware acceleration
- Proper z-index stacking for overlay hierarchy
- ARIA attributes for screen reader accessibility
- Touch-friendly interaction patterns

---

## Top Bar & Header

### Logo System

**Responsive Brand Identity**

- **SVG-Based**: Vector logo with `currentColor` for theme adaptation
- **Sizing Variants**: 40px (standard), 48px (medium), 64px (large)
- **Clear Space**: Minimum 16px clearance on all sides
- **Theme Adaptation**: Automatically adapts to light/dark modes
- **Positioning**: Left-aligned in header with consistent spacing

### Search System

**Adaptive Search Interface**

**Desktop Behavior (1024px+):**
- **Full Search Bar**: Expanded input field with search icon
- **Width**: Flexible with container constraints
- **Placeholder Text**: Contextual search hints
- **Focus States**: Primary color ring with proper contrast

**Mobile Behavior (<1024px):**
- **Search Icon**: Collapses to icon-only button
- **Modal Pattern**: Expands to full-screen search when activated
- **Touch Target**: 44px minimum for accessibility
- **Animation**: Smooth expand/collapse transitions

### Action Buttons Area

**Right-Aligned Control Group**

- **Theme Toggle**: Persistent dark/light mode switcher
- **Profile/Avatar**: User account access point
- **Secondary Actions**: Context-dependent buttons
- **Spacing**: 8px gaps between elements (--spacing-sm)
- **Responsive**: Adapts layout based on available space

---

## Theme System

### Dark/Light Mode Toggle

**Comprehensive Theme Management**

**Theme Detection:**
- **System Preference**: Automatically detects `prefers-color-scheme`
- **User Override**: Manual theme selection takes precedence
- **Persistence**: Theme choice saved to localStorage
- **Early Load**: Theme applied before DOM paint to prevent flash

**Theme Toggle Button:**
- **Icon Animation**: Smooth icon transitions (sun ↔ moon)
- **State Indication**: Visual feedback for current theme
- **Accessibility**: Proper ARIA attributes and labels
- **Keyboard Support**: Enter/Space key activation

**Technical Implementation:**
- **Class-Based**: Uses `.dark` class on `<html>` element
- **CSS Custom Properties**: Theme-aware color variables
- **Color Scheme**: Synced `color-scheme` CSS property
- **Instant Application**: No flash of unstyled content

### Color Adaptation

**Comprehensive Theme Support**

- **CSS Variables**: All colors defined as CSS custom properties
- **Automatic Contrast**: Proper contrast ratios maintained in both themes
- **Icon Adaptation**: Material icons adapt via `currentColor`
- **Component States**: All interactive states properly themed
- **Border/Shadow**: Theme-aware borders and shadow systems

---

## Toast & Notification System

### Toast Creation & Management

**ARIA-Compliant Notification System**

**Core Features:**
- **Maximum Limit**: 3 simultaneous toasts to prevent screen clutter
- **Auto-Dismiss**: Configurable timeout (default 4 seconds)
- **Manual Dismiss**: Close button with proper labeling
- **Queue Management**: Oldest toasts removed when limit exceeded
- **Animation**: Slide-in from top with fade effects

**Toast Types & Styling:**
- **Success**: Green accent with checkmark icon
- **Error**: Red accent with error icon  
- **Warning**: Amber accent with warning icon
- **Info**: Blue accent with info icon
- **Default**: Neutral styling for general messages

**Accessibility Features:**
- **ARIA Live Region**: Screen reader announcements
- **Focus Management**: Proper focus handling on appear/dismiss
- **Keyboard Navigation**: ESC key dismisses active toast
- **High Contrast**: Maintains readability in all themes

### Visual Treatment

**Glass Morphism Design**

- **Backdrop Blur**: Subtle background blur effect
- **Border**: Subtle border with theme-appropriate colors
- **Shadow**: Multi-layer shadow system for depth
- **Rounded Corners**: 12px border radius for modern appearance
- **Color Overlay**: Semi-transparent background with theme adaptation

---

## Interactive Elements

### Button System

**Comprehensive Button Variants**

**Primary Buttons:**
- **Background**: Primary color gradient
- **Text**: High contrast white/dark text
- **States**: Hover, focus, active, disabled
- **Animation**: Scale transform on active (0.98)
- **Focus Ring**: Primary color with proper offset

**Secondary Buttons:**
- **Border**: Primary color border with transparent background
- **Text**: Primary color text
- **Hover**: Subtle background fill
- **Focus**: Same ring system as primary

**Tertiary/Ghost Buttons:**
- **Minimal**: Text-only with subtle hover states
- **Usage**: Less prominent actions
- **Colors**: Adapts to context and theme

### Form Controls

**Styled Form Elements**

**Text Inputs:**
- **Border**: Rounded-xl styling (12px radius)
- **Focus States**: Primary color ring
- **Padding**: Comfortable internal spacing
- **Typography**: Inter font family
- **Placeholder**: Subtle neutral text

**Checkboxes & Radio Buttons:**
- **Custom Styling**: Replaces browser defaults
- **Size**: 18px for optimal touch targets
- **Check Mark**: SVG-based check icons
- **States**: Unchecked, checked, indeterminate, disabled
- **Theme Support**: Adapts to light/dark modes

**Select Elements:**
- **Dropdown Arrow**: Custom SVG arrow icon
- **Options Styling**: Consistent with design system
- **Focus States**: Keyboard navigation support
- **Disabled States**: Proper visual feedback

### Hover & Focus Effects

**Consistent Interaction Feedback**

- **Hover States**: Subtle background color shifts
- **Focus Rings**: 2px primary color rings with 2px offset
- **Active States**: Scale transforms (scale-[0.98])
- **Transition Duration**: 150-200ms for responsive feel
- **Cubic Bezier**: Custom easing for smooth animations

---

## Responsive Behavior

### Breakpoint System

**Mobile-First Responsive Design**

**Breakpoints:**
- **Small**: 0-767px (mobile)
- **Medium**: 768-1023px (tablet)
- **Large**: 1024px+ (desktop)

**Navigation Adaptation:**
- **Mobile**: Bottom navigation with submenu sheets
- **Tablet**: Hybrid approach with rail + bottom nav
- **Desktop**: Full rail navigation with overlay drawers

### Content Adaptation

**Responsive Layout Patterns**

**Grid Systems:**
- **Mobile**: Single column with full-width cards
- **Tablet**: 2-3 column grid layouts
- **Desktop**: Multi-column with appropriate spacing

**Typography Scaling:**
- **Mobile**: Compact text sizing for readability
- **Desktop**: Larger text with increased line heights
- **Responsive Units**: rem-based scaling with viewport considerations

**Spacing Adaptation:**
- **Mobile**: Reduced margins and padding
- **Desktop**: Generous white space and breathing room
- **8px Grid**: Consistent spacing system across all breakpoints

### Touch Interaction

**Mobile-Optimized Interactions**

- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Gesture Support**: Swipe gestures for drawer dismissal
- **Tap Feedback**: Visual feedback for all touch interactions
- **Scroll Behavior**: Momentum scrolling for smooth experience

---

## Visual Design Elements

### Color System

**Semantic Color Palette**

**Primary Colors (Orange Scale):**
- Used for main brand expression and primary CTAs
- 50-900 scale providing comprehensive tinting options
- WCAG AA compliant contrast ratios

**Accent Colors (Teal Scale):**
- Secondary brand expression and supporting elements
- Complementary to primary orange palette
- Used for links and secondary actions

**Neutral Colors (Gray Scale):**
- Text, backgrounds, borders, and structural elements
- Subtle variations for layered interfaces
- Both warm and cool gray options

**Semantic Colors:**
- **Success**: Emerald green for positive states
- **Error**: Red for errors and destructive actions  
- **Warning**: Amber for caution states
- **Info**: Sky blue for informational content

### Typography System

**Inter Font Family Implementation**

**Font Weights:**
- **500**: Medium for body text
- **600**: Semibold for emphasis
- **700**: Bold for headings

**Type Scale:**
- **Headings**: Large, medium, small variants
- **Body Text**: 16px base with 1.5 line height
- **Captions**: 14px for secondary information
- **Labels**: 12px for form labels and metadata

**Font Features:**
- **OpenType Features**: Contextual alternates enabled
- **Font Smoothing**: Optimized for all screen types
- **Variable Font**: Responsive weight adjustments

### Iconography

**Material Symbols Rounded**

**Icon System:**
- **Variable Font**: Weight and fill variations
- **Size Variants**: 16px, 20px, 24px standard sizes  
- **Fill States**: Outline for inactive, filled for active
- **Weight Adjustments**: 400 (regular), 600 (semibold)
- **Consistent Sizing**: Proper optical alignment

**Usage Patterns:**
- **Navigation**: Primary icons for each section
- **Actions**: Button and control iconography  
- **Status**: Semantic icons for different states
- **Decoration**: Subtle supporting visual elements

### Spacing System

**8px Grid System**

**Base Unit**: 8px (0.5rem) provides consistent rhythm

**Spacing Scale:**
- **XS**: 4px (0.25rem)
- **SM**: 8px (0.5rem)
- **MD**: 16px (1rem)
- **LG**: 24px (1.5rem)
- **XL**: 32px (2rem)
- **2XL**: 48px (3rem)
- **3XL**: 64px (4rem)
- **4XL**: 96px (6rem)

### Shadow System

**Layered Depth System**

**Shadow Levels:**
- **Level 1**: Subtle card shadows
- **Level 2**: Elevated elements (buttons, inputs)
- **Level 3**: Modal and drawer shadows
- **Level 4**: Toast and overlay shadows

**Theme Adaptation:**
- Light theme: Subtle gray shadows
- Dark theme: Deeper black shadows with reduced opacity

---

## Accessibility Features

### Keyboard Navigation

**Complete Keyboard Support**

- **Tab Order**: Logical tab sequence through all interactive elements
- **Focus Indicators**: Visible focus rings on all focusable elements
- **Skip Links**: Quick navigation to main content areas
- **Escape Key**: Dismisses modals, drawers, and overlays
- **Arrow Keys**: Navigation within component groups
- **Enter/Space**: Activates buttons and controls

### Screen Reader Support

**ARIA Implementation**

**Semantic HTML:**
- Proper heading hierarchy (h1-h6)
- Semantic sectioning elements (nav, main, aside)
- Form labels and descriptions
- Button and link purposes clearly identified

**ARIA Attributes:**
- **aria-label**: Descriptive labels for complex controls
- **aria-expanded**: State for collapsible elements  
- **aria-live**: Toast announcements
- **aria-describedby**: Additional context for form fields
- **role**: Clarifies element purposes when needed

### Color Contrast

**WCAG 2.1 AA Compliance**

- **Text Contrast**: 4.5:1 minimum for normal text
- **Large Text**: 3:1 minimum for 18px+ or bold 14px+
- **Interactive Elements**: Sufficient contrast in all states
- **Focus Indicators**: High contrast focus rings
- **Theme Consistency**: Maintained across light/dark modes

### Motion & Animation

**Respectful Motion Design**

- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Meaningful Animation**: Animations serve functional purposes
- **Reasonable Duration**: 150-300ms for most transitions
- **Easing**: Natural motion curves that feel responsive
- **Optional**: Non-essential animations can be disabled

---

This comprehensive features documentation covers all major functionality and design elements implemented in the Averby Design System template. The system provides a solid foundation for building accessible, responsive, and visually consistent web applications while maintaining high usability standards across all device types and user capabilities.