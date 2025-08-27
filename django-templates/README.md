# Averby Design System

This directory contains the official Averby Design System, a comprehensive UI framework built on Tailwind CSS v4.1 with Material Symbols icons.

## Directory Structure

```
design-system/
├── templates/          # HTML templates
│   └── base.html      # Main template (from index.html)
├── styles/            # CSS and styling
│   └── main.css       # Main stylesheet with Tailwind config
├── components/        # Reusable UI components (to be extracted)
├── assets/           # Images, fonts, icons
└── docs/             # Documentation
    ├── style-guide.html  # Interactive component showcase
    └── style-guide.md    # Written style guide
```

## Usage

### For Django Templates

1. **Provider Console** (Management Interface):
   - Located at: `http://app.averby.com`
   - Use `base.html` as the base template
   - Primary navigation: Dashboard, Content Hub, Tasks, Programs, Analytics
   - Admin features: User management, billing, settings

2. **Participant Console** (Learner Interface):
   - Located at: `http://my.averby.com`
   - Use `base.html` as the base template
   - Primary navigation: My Learning, Tasks, Journal, Community
   - Learner features: Progress tracking, content access

### For Next.js Apps (Future)

The design system will be packaged as:
- Shared component library
- Tailwind preset configuration
- TypeScript type definitions

## Template Features

### Layout Structure
- **Left Sidebar**: Main navigation with vertical icon/label buttons
- **Left Drawer**: Contextual submenu (slides out when needed)
- **Right Drawer**: Filters and settings panels
- **Top Navbar**: Page title, search bar, user menu
- **Main Content**: Responsive grid layout

### Theme System
- **Dark/Light Mode**: Automatic detection with manual override
- **Color Scales**: Primary (Orange), Accent (Teal), Neutral (Gray)
- **Semantic Colors**: Success, Warning, Error, Info

### Typography
- **Font**: Inter (500, 600, 700 weights)
- **Icons**: Material Symbols Rounded
- **Scale**: Responsive type scale from 11px to 48px

### Components (Available in style-guide.html)
- Buttons (Primary, Secondary, Ghost, Icon)
- Cards (Stats, Content, List)
- Forms (Inputs, Selects, Checkboxes, Radio)
- Tables (Data grids with sorting/filtering)
- Modals and Dialogs
- Navigation elements
- Badges and Pills
- Progress indicators
- Toast notifications

## Customization for Provider Accounts

The system supports white-labeling for Business/Enterprise tiers:
- Custom brand colors (primary/accent)
- Logo replacement
- Custom fonts (optional)
- Theme preferences

## Development Notes

### Current Implementation
- Using Tailwind CSS v4 browser runtime for development
- Material Symbols via Google Fonts CDN
- Inter font via Google Fonts CDN

### Production Build (TODO)
- Set up Tailwind CSS build pipeline
- Bundle and optimize assets
- Create component library package
- Generate TypeScript definitions

## Navigation Mapping

### Provider Console Navigation
```
- Dashboard (dashboard icon)
- Content Hub (library_books icon)
- Tasks (task_alt icon)
- Programs (school icon)
- Paths (route icon)
- Schedule (calendar_month icon)
- Community (forum icon)
- Analytics (analytics icon)
- Settings (settings icon)
```

### Participant Console Navigation
```
- My Learning (dashboard icon)
- Tasks (task_alt icon)
- Journal (edit_note icon)
- Programs (school icon)
- Paths (route icon)
- Schedule (event icon)
- Community (groups icon)
- Recognition (emoji_events icon)
- Profile (account_circle icon)
```

## Next Steps

1. Extract reusable components from base.html
2. Create Django template inheritance structure
3. Set up Next.js component library
4. Configure build pipeline for production
5. Create theme customization system
