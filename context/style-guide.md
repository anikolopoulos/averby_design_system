# Averby Admin Console — Visual Style Guide (for Designers)

> "Style guides document the visual language and rules so teams can create interfaces with consistency at scale."

---

## 1) Brand & Identity

### Logo

- Use the provided inline SVG (`currentColor`) so it adapts to light/dark themes.
- Clear space: at least 8px around the mark (rail keeps extra spacing).
- Minimum size: 32×32 px in UI.

### Tone

- Calm, modern, accessible.
- Prioritize clarity over decoration.
- Avoid heavy gradients and ornamental backgrounds.

### Imagery

- Neutral, clean illustrations or photography with ample white/negative space.
- **Needs work:** define do/don't examples, preferred illustration style, and photo color grading.

---

## 2) Color System

### Palette (from @theme in base.html)

- **Primary (orange scale):** `--color-primary-50` to `--color-primary-900`
  - Primary usage: key actions, active nav backgrounds/labels, focus ring accents.
- **Accent (teal scale):** `--color-accent-50` to `--color-accent-900`
  - Accent usage: secondary actions (e.g., "Apply" in filters), emphasis chips.
- **Neutral (gray):** `--color-neutral-50` to `--color-neutral-900`
- **Status:** Success (emerald), Error (red), Warning (amber), Info (sky).

### Roles in UI

- **Light:** surfaces use neutral-50/100; content cards: neutral-50; headers: neutral-50/70.
- **Dark:** surfaces use neutral-900; content cards: neutral-900/60.
- **Active sidebar item (light):** background primary-50, label/icon primary-600.
- **Active sidebar item (dark):** subtle primary tonal background, label/icon primary-300.

### Accessibility

- Body text must meet WCAG AA: contrast ≥ 4.5:1 for normal text; ≥ 3:1 for large text.
- Don't convey meaning with color alone; pair with icons/labels.

> "A 4.5:1 contrast ratio supports users with lower visual acuity and age-related contrast loss."

### Color roles (mental model)

- Map colors to roles (primary, on-primary, surface, on-surface) so designers place color by function, not hex.

**Needs work:** finalize role swatches and document "on-color" pairings for dark mode (e.g., on-primary = white).

---

## 3) Typography

### Font family

- Inter (UI text). Weights in code: 500, 600, 700.

### Type scale & usage

- **Page titles:** 18–20 px (600–700).
- **Section titles:** 16–18 px (600).
- **Body:** 14–16 px (400–500).
- **Chips/labels:** 12–13 px (600–700).
- **Line-height:** tight for headings, 1.4–1.5 for body.

> Material guidance: establish hierarchy with consistent type styles and spacing.

**Needs work:** publish a full type ramp (Display → Headline → Title → Body → Label) with exact sizes/leading.

---

## 4) Iconography

### Library

- Material Symbols Rounded (variable font). Axes: FILL, wght, GRAD, opsz.

### States (as in base.html)

- **Default rail icons:** weight ~350 (unfilled).
- **Hover:** ~600 (unfilled).
- **Active:** FILL 1, weight ~650.

> "Material Symbols support fill and weight adjustments to convey state (e.g., unselected vs. selected)."

### Size

- 20–24 px in navigation and controls.

**Needs work:** icon grid, do/don't (stroke alignment, corner rounding), and a vetted subset for product.

---

## 5) Spacing, Layout & Grid

### Key measurements

- **Rail width:** 6rem (`w-24`).
- **Top bar height:** `h-14` (56 px).
- **Card padding:** 20 px.
- **Section gutters:** 24 px (min) responsive to 24–32 px.
- **System spacing:** 4/8 px increments; prefer the Tailwind scale.

### Page structure

- Left rail (sticky), content column with top app bar, inset drawer that compresses content when open.

**Needs work:** publish a 4-pt spacing map for margins, paddings, and gaps.

---

## 6) Elevation & Surfaces

### Shadows (from code)

- **Cards:** light `shadow-sm`, hover `shadow-md`.
- **Drawers:** `shadow-lg`.
- **Rail edge:** subtle lateral shadow.

> Material 3 leans on tone-based surfaces plus shadows; use stronger tone for higher "elevation."

**Needs work:** define elevation levels (0–3) with tone+shadow recipes for light/dark.

---

## 7) Motion

### Durations & easing (from code)

- **Drawers & inset:** 280 ms, `cubic-bezier(.2, .8, .2, 1)` slide/opacity.
- **Toasts:** 300 ms ease-out, translate-y + fade.

### Principles

- Motion supports context (sliding panels from their source edge).
- Keep interactions under 300 ms; use spring-like easing for large panels; ease-out for toasts.

**Needs work:** document standard enter/exit pairs for modals, menus, and chips.

---

## 8) Components

### Sidebar Navigation

- **Item anatomy:** icon over label, center-aligned, 13 px label, bold on active.
- **Hover:** light neutral tint (dark: neutral/tint).
- **Active:** primary-tinted background; icon + label in primary.

### Top App Bar

- Title left; search centered; avatar menu right.
- Background: translucent surface with blur.

### Buttons

- **Primary (filled):** primary-500 bg, neutral-50 text, hover primary-600.
- **Outline:** 1px neutral border, hover neutral tint.

### Inputs

- 1px neutral border; 10 px height units; focus ring uses primary tint.

### Chips

- Primary/Info/Success variants as soft backgrounds with matching text.

### Cards

- Rounded-2xl; neutral surfaces; light shadow with hover lift.

### Drawers

- **Left overlays (Programs):** rounded on right only.
- **Right overlay (Filters):** rounded on left only.
- **Inset drawer (Create):** pushes content; width 22rem.

### Toasts

- Stack top-right; status color or glass variant; dismiss on click or timeout; `aria-live="polite"`.

**Needs work:** empty states, tables, tabs, pagination, form validation states.

---

## 9) Light & Dark Mode

### Strategy

- Class-based theme on `<html>` (`.dark`). Dark follows system unless user toggles.

### Design rules

- Maintain color roles across modes.
- Use tonal surfaces in dark; reduce pure white text; prefer near-white.
- Active tints remain primary but adjusted for dark (lighter on-color).

> Material color roles help apply consistent emphasis across surfaces and states.

**Needs work:** finalize dark equivalents for chips, toasts (glass), and table hovers.

---

## 10) Accessibility

- **Contrast:** AA at minimum (4.5:1 normal, 3:1 large).
- **Focus:** always visible (primary ring).
- **Semantics:** use `aria-current="page"` for the active nav; toasts use `role="status"`/alert and `aria-live="polite"`.
- **Hit targets:** ≥ 40×40 px for tap.
- **Color alone:** never the only indicator.

---

## 11) Content & Microcopy

- **Headlines:** short, action-oriented.
- **Labels:** sentence case; avoid jargon.
- **Messages:** say what happened + what you can do next.
- **Toasts:** single sentence + optional detail; avoid stacking more than 3.

> Content standards should be part of your design system so text stays consistent across components and channels.

**Needs work:** voice & tone matrix, error message patterns, glossary.

---

## 12) Grids & Breakpoints

- **Responsive grid targets:** 1 → 2 → 3 columns for dashboard cards (see base.html).
- Keep gutters consistent when drawers open (content should not jump).
- Reserve scrollbar space on main content to prevent layout shift.

**Needs work:** publish exact breakpoints, container widths, and column counts per layout.

---

## 13) Icon & Asset Delivery

- Use Material Symbols font in product for crisp scaling and state control.
- Export any custom icons on a 24 px grid; align to pixel grid; match visual weight to Material Symbols defaults.

---

## 14) Design Tokens (Naming)

> "Design tokens are named values that store decisions like color, type, and spacing for reuse."

### Suggested token groups

- `color.*` (primary, accent, neutral, success, error, warning, info)
- `surface.*` (page, panel, card)
- `text.*` (default, subdued, inverse)
- `radius.*` (sm, xl, 2xl)
- `shadow.*` (sm, md, lg)
- `motion.*` (drawer.duration, drawer.easing, toast.duration)

**Needs work:** formalize Figma/JSON token file and map to code variables.

---

## 15) Performance & Loading

### Critical Performance

- **First Contentful Paint:** Target <1.5s on 3G.
- **Cumulative Layout Shift:** Score <0.1 to prevent layout jumps.
- **Largest Contentful Paint:** <2.5s for good user experience.

### Loading Patterns

- **Skeleton screens:** Match content structure; avoid generic spinners.
- **Progressive loading:** Show critical content first, enhance progressively.
- **Lazy loading:** Images and heavy components below the fold.
- **Preloading:** Critical fonts, above-fold images, next likely pages.

### Image Optimization

- Use modern formats (WebP, AVIF) with fallbacks.
- Responsive images with `srcset` for different screen densities.
- Compress images: 80-85% quality for photos, optimize SVGs.
- Size images appropriately: never rely on CSS to downscale.

**Best practice:** "Users abandon sites that take >3 seconds to load. Performance is a feature."

---

## 16) Progressive Enhancement & Resilience

### Core Functionality

- Essential features work without JavaScript.
- Forms submit and validate server-side.
- Navigation remains functional if CSS fails to load.

### Graceful Degradation

- Feature detection over browser detection.
- Provide alternatives for CSS Grid (flexbox fallback).
- Ensure contrast works if custom fonts fail to load.

### Error Boundaries

- Network failure states with retry options.
- Offline functionality indicators.
- Graceful handling of API timeouts.

**Philosophy:** "Build from a solid foundation up, not a complex framework down."

---

## 17) Information Architecture & Content Strategy

### Visual Hierarchy

- **F-pattern scanning:** Place key actions on left, secondary on right.
- **Progressive disclosure:** Show essential info first, details on demand.
- **Content density:** 7±2 items per section to avoid cognitive overload.

### White Space Strategy

- **Breathing room:** Minimum 16px between unrelated content blocks.
- **Grouping:** Related items closer together than unrelated ones.
- **Focus areas:** Extra white space around primary actions.

### Content Patterns

- **Scannable text:** Use subheadings every 3-4 paragraphs.
- **Front-load benefits:** Lead with outcomes, follow with features.
- **Action-oriented labels:** "Create project" not "New project."

---

## 18) Advanced Interaction Patterns

### Micro-interactions

- **Hover feedback:** 150ms delay before showing tooltips.
- **Button states:** Subtle scale (0.98) on press, bounce back on release.
- **Form feedback:** Inline validation 500ms after user stops typing.
- **Progress indicators:** Show completion percentage for multi-step flows.

### Touch & Gesture Support

- **Tap targets:** Minimum 44×44px, prefer 48×48px.
- **Swipe gestures:** Support swipe-to-delete on mobile lists.
- **Pull-to-refresh:** On mobile data views where appropriate.
- **Pinch-to-zoom:** Allow on data visualizations and images.

### Keyboard Navigation

- **Focus indicators:** Always visible, never rely on browser defaults.
- **Tab order:** Logical flow, skip repetitive navigation with skip links.
- **Shortcuts:** Common patterns (⌘K for search, Esc to close modals).
- **Focus management:** Move focus to opened modals, return on close.

---

## 19) Data & Form Design

### Form Best Practices

- **Single column:** Avoid multi-column forms except for closely related fields.
- **Label placement:** Above fields (not placeholder text as labels).
- **Field sizing:** Match input length to expected content length.
- **Validation timing:** On blur for individual fields, on submit for form.

### Error Handling

- **Error messages:** Specific, actionable, positioned near the problem.
- **Success states:** Confirm completion with clear next steps.
- **Inline help:** Show format examples before users make mistakes.
- **Recovery paths:** Always provide a way to fix or retry.

### Data Tables

- **Responsive strategy:** Stack on mobile, horizontal scroll for desktop.
- **Sorting indicators:** Clear visual states for sortable columns.
- **Row actions:** Group in dropdown for 3+ actions per row.
- **Pagination:** Show total count, allow page size selection.

---

## 20) Notification & Feedback Systems

### Toast Hierarchy

- **Error:** Red background, persist until dismissed.
- **Warning:** Amber background, auto-dismiss after 6s.
- **Success:** Green background, auto-dismiss after 4s.
- **Info:** Blue background, auto-dismiss after 5s.

### Confirmation Patterns

- **Destructive actions:** Require explicit confirmation with action name.
- **Bulk operations:** Show count and allow undo within time window.
- **Save states:** Auto-save with visual indicators, manual save for critical data.

### Status Communication

- **Loading states:** Show what's happening ("Saving changes...").
- **Empty states:** Explain why it's empty, provide next steps.
- **Offline indicators:** Clear status when connectivity is lost.

---

## 21) Patterns (Implementation Roadmap)

### Implementation Priority

**Phase 1:** Core patterns for MVP

- Empty states with illustration + primary action
- Loading skeletons matching content structure
- Basic form validation and error states
- Standard data table with sorting

**Phase 2:** Enhanced interactions

- Advanced filter panels with chips and badges
- Keyboard shortcuts menu
- Progressive loading and infinite scroll
- Bulk operations with undo

**Phase 3:** Polish and optimization

- Micro-interactions and hover states
- Advanced search with autocomplete
- Drag-and-drop functionality
- Offline-first features

---

## 22) Mobile-First Considerations

### Responsive Breakpoints

- **Mobile:** 320px - 767px (touch-first interactions)
- **Tablet:** 768px - 1023px (hybrid touch/cursor)
- **Desktop:** 1024px+ (cursor-optimized)

### Touch Interactions

- **Navigation:** Bottom tab bar for primary actions on mobile
- **Gestures:** Swipe navigation between related views
- **Input methods:** Show appropriate keyboards (numeric, email, etc.)
- **Orientation:** Support both portrait and landscape gracefully

### Content Adaptation

- **Typography:** Increase base font size to 16px minimum on mobile
- **Spacing:** Larger touch targets, more generous padding
- **Navigation:** Collapsible sidebar becomes full-screen overlay
- **Tables:** Transform to cards or use horizontal scroll with sticky columns

---

## 23) Internationalization & Accessibility

### Text and Layout

- **Text expansion:** Design for 30% longer text in other languages
- **RTL support:** Ensure layout works for Arabic, Hebrew
- **Font fallbacks:** Web-safe fonts for unsupported character sets
- **Number formatting:** Respect locale conventions (1,000 vs 1.000)

### Enhanced Accessibility

- **Screen readers:** Meaningful landmarks, headings, and descriptions
- **Reduced motion:** Respect `prefers-reduced-motion` preference
- **High contrast:** Test with Windows High Contrast mode
- **Voice control:** Ensure all interactive elements have accessible names

### Inclusive Design

- **Color blindness:** Test with common types (deuteranopia, protanopia)
- **Low vision:** Ensure 200% zoom works without horizontal scroll
- **Motor impairments:** Support keyboard-only and voice navigation
- **Cognitive load:** Minimize memory requirements, provide clear paths

---

## 24) Security & Privacy UX

### Authentication Patterns

- **Password fields:** Show/hide toggle, strength indicators
- **Two-factor auth:** Clear setup flow, backup codes
- **Session management:** Warn before auto-logout, extend session option
- **Account recovery:** Multiple verification methods

### Data Privacy

- **Consent flows:** Granular permissions with clear explanations
- **Data visibility:** Show what data is collected and why
- **Export/delete:** Easy access to user data management
- **Transparent policies:** Link to privacy policy in context

---

## 25) Quality Checklist (Enhanced Design QA)

- Colors follow the role map; contrast passes AA.
- Icons use correct state: default/hover/active weight/fill.
- Focus visible on every interactive element.
- Spacing aligns to 4/8 px scale.
- Motion uses approved durations/easing.
- Light/dark layouts reviewed side-by-side.
- Strings meet content standards.

### Visual Design

- Colors follow the role map; contrast passes AA (minimum 4.5:1)
- Icons use correct state: default/hover/active weight/fill
- Focus visible on every interactive element
- Spacing aligns to 4/8 px scale
- Motion uses approved durations/easing
- Light/dark layouts reviewed side-by-side

### Interaction Design

- All interactive elements have 44×44px minimum touch targets
- Hover states provide clear feedback within 150ms
- Loading states show progress and what's happening
- Error messages are specific and actionable
- Success states confirm completion with next steps

### Performance

- Images optimized and properly sized
- Critical CSS inlined, non-critical CSS deferred
- Fonts preloaded, fallbacks defined
- JavaScript doesn't block rendering
- Core functionality works without JavaScript

### Accessibility

- All content accessible via keyboard navigation
- Screen reader tested with actual assistive technology
- Respects user preferences (reduced motion, high contrast)
- Form labels properly associated with inputs
- Color never the only way to convey information

### Content Quality

- Strings meet content standards and voice guidelines
- Microcopy is helpful and action-oriented
- Empty states provide clear next steps
- Error messages explain what happened and how to fix it

---

## 26) Performance Budgets

### Recommended Limits

- **Bundle size:** <250KB gzipped for initial load
- **Images:** <500KB total above the fold
- **Fonts:** <100KB total font files
- **Third-party scripts:** <50KB (analytics, etc.)

### Monitoring

- **Core Web Vitals:** Track FCP, LCP, CLS monthly
- **Real user monitoring:** 95th percentile load times
- **Bundle analysis:** Track dependency growth over time
- **Image optimization:** Regular audits of asset sizes

---

## 27) Browser Support Strategy

### Tier 1 (Full Support)

- Chrome, Firefox, Safari, Edge (current + 1 previous version)
- iOS Safari (current + 1 previous version)
- Chrome Android (current version)

### Tier 2 (Core Features)

- Internet Explorer 11 (if business requirement)
- Older mobile browsers (degraded experience, core functionality)

### Progressive Enhancement

- CSS Grid with Flexbox fallback
- Modern JavaScript with polyfills for core features
- SVG icons with PNG fallbacks
- Web fonts with system font fallbacks

---

## 28) References & Further Reading

- NN/g on style guides & systems: "capture guidelines and visuals for consistency at scale."
- Material color roles & tone surfaces: guidance for assigning colors to UI roles.
- WCAG contrast ratios (AA/AAA): text and non-text requirements.
- Material Symbols axes and usage for stateful icons.
- Design tokens definition.

### Design Systems & Guidelines

- NN/g on style guides & systems: "capture guidelines and visuals for consistency at scale"
- Material Design 3: color roles, elevation, motion principles
- Apple Human Interface Guidelines: iOS and macOS patterns
- Carbon Design System: IBM's comprehensive design system
- Atlassian Design System: practical component patterns

### Accessibility & Standards

- WCAG 2.1 Guidelines: AA compliance requirements and techniques
- WebAIM: practical accessibility testing and implementation
- A11y Project: community-driven accessibility resources
- Color Universal Design: inclusive color palette guidance

### Performance & Technical

- Web Performance Working Group: Core Web Vitals and metrics
- Google PageSpeed Insights: performance testing and optimization
- Can I Use: browser support for web technologies
- WebP and AVIF Support: modern image format adoption

### User Experience

- Don Norman's Design Principles: usability and cognitive psychology
- Steve Krug's Web Usability: practical testing approaches
- Nielsen's 10 Usability Heuristics: fundamental UX principles
- Inclusive Design Principles: designing for diverse users

### Typography & Content

- Butterick's Practical Typography: comprehensive typography guide
- Content Strategy for the Web: structured content approaches
- Voice and Tone Guidelines: consistent communication patterns

---

## 29) Implementation Guidelines

### Design-to-Code Workflow

1. **Design tokens:** Export from Figma to code variables
2. **Component library:** Build in Storybook for isolation testing
3. **Documentation:** Auto-generate props and usage examples
4. **Testing:** Visual regression tests for component changes

### Maintenance Schedule

- **Monthly:** Review Core Web Vitals and performance metrics
- **Quarterly:** Accessibility audit with assistive technology
- **Bi-annually:** Color contrast audit, browser support review
- **Annually:** Complete style guide review and updates

---

## 30) Open Questions & Decisions Needed

### Color & Branding

- Do you want accent (teal) on secondary actions everywhere, or only in filter/analytics contexts?
- Should active nav also show a slim primary indicator bar?
- Approve the proposed elevation scale 0–3?
- Any photography rules for people imagery in marketing sections?

### Layout & Responsive Design

- Define the minimum supported viewport for designers (e.g., 360×640)?
- Should the sidebar collapse to icons-only on tablet, or remain full-width?
- Preferred mobile navigation pattern: bottom tabs, hamburger menu, or hybrid?

### Performance & Technical

- What's the target performance budget for bundle size and load times?
- Required browser support (IE11, older mobile browsers)?
- Offline functionality requirements for admin features?
- Progressive Web App capabilities needed (notifications, offline storage)?

### User Experience

- Auto-save frequency for forms (every 30s, on field blur, manual only)?
- Bulk operation patterns: select all, undo timeouts, confirmation flows?
- Notification persistence: which types require manual dismissal?
- Search behavior: real-time results, debounced queries, minimum character count?

### Content & Accessibility

- Voice and tone for error messages: formal, friendly, or technical?
- Internationalization requirements: which languages, RTL support needed?
- Accessibility compliance level: WCAG AA minimum or AAA for critical flows?
- Content loading strategy: skeleton screens, spinners, or progressive disclosure?
