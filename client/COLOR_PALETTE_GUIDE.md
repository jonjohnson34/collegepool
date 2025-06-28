# Color Palette Guide

## 🎨 How to Change Your App's Color Palette

Your application now has a flexible color palette system that allows you to easily switch between different themes. All colors are centralized in `src/styles.scss` and will automatically apply to all components.

## 📋 Available Themes

### 1. **Ocean/Teal Theme** (Currently Active)
- **Primary**: Teal (#20c997)
- **Secondary**: Blue (#17a2b8)
- **Accent**: Green (#28a745)
- **Style**: Professional & Calming

### 2. **Forest Green Theme**
- **Primary**: Forest Green (#198754)
- **Secondary**: Teal (#20c997)
- **Accent**: Cyan (#0dcaf0)
- **Style**: Nature & Growth

### 3. **Sunset/Orange Theme**
- **Primary**: Orange (#fd7e14)
- **Secondary**: Yellow (#ffc107)
- **Accent**: Green (#28a745)
- **Style**: Energetic & Warm

### 4. **Purple/Magenta Theme**
- **Primary**: Purple (#6f42c1)
- **Secondary**: Magenta (#e83e8c)
- **Accent**: Blue (#17a2b8)
- **Style**: Creative & Modern

### 5. **Dark/Neon Theme**
- **Primary**: Neon Blue (#00d4ff)
- **Secondary**: Neon Green (#00ff88)
- **Accent**: Blue (#0099ff)
- **Style**: Bold & Contemporary

## 🔄 How to Switch Themes

1. **Open** `client/src/styles.scss`
2. **Find** the theme sections (lines 8-174)
3. **Comment out** the current active theme (Theme 1)
4. **Uncomment** your desired theme section
5. **Save** the file - changes will apply automatically!

### Example: Switching to Forest Green Theme

```scss
/* Comment out Theme 1 */
/*
:root {
  --bs-primary: #20c997;
  // ... other colors
}
*/

/* Uncomment Theme 2 */
:root {
  --bs-primary: #198754;
  --bs-success: #20c997;
  // ... other colors
}
```

## 🎯 What Gets Updated Automatically

When you change themes, these elements automatically update:

- ✅ **Navigation bars** - Background colors
- ✅ **Buttons** - Primary, success, outline styles
- ✅ **Cards** - Headers and accent colors
- ✅ **Forms** - Focus states and borders
- ✅ **Alerts** - Background and border colors
- ✅ **Badges** - Background colors
- ✅ **Gradients** - Background gradients
- ✅ **Text gradients** - Gradient text effects

## 🛠️ Custom Color Variables

Each theme includes these custom variables:

```scss
--theme-primary: #20c997;        /* Main brand color */
--theme-primary-dark: #1ba085;   /* Darker shade for hover */
--theme-primary-light: #75d7c7;  /* Lighter shade */
--theme-secondary: #17a2b8;      /* Secondary brand color */
--theme-accent: #28a745;         /* Accent color */
--theme-warm: #ffc107;           /* Warm accent */
--theme-danger: #dc3545;         /* Error/danger color */
--theme-neutral: #6c757d;        /* Neutral gray */
--theme-light: #f8f9fa;          /* Light background */
--theme-dark: #343a40;           /* Dark background */
--gradient-start: #20c997;       /* Gradient start */
--gradient-end: #17a2b8;         /* Gradient end */
```

## 🎨 Using Custom Colors in Components

You can use these variables in your component styles:

```scss
.my-custom-button {
  background: var(--theme-primary);
  color: white;
}

.my-custom-card {
  border-left: 4px solid var(--theme-accent);
}

.my-custom-text {
  color: var(--theme-secondary);
}
```

## 🚀 Utility Classes

New utility classes are available:

```html
<!-- Background colors -->
<div class="bg-theme-primary">Primary background</div>
<div class="bg-theme-secondary">Secondary background</div>

<!-- Text colors -->
<span class="text-theme-primary">Primary text</span>
<span class="text-theme-secondary">Secondary text</span>

<!-- Gradient text -->
<h1 class="text-gradient">Gradient text</h1>

<!-- Theme shadow -->
<div class="shadow-theme">Theme-colored shadow</div>
```

## 🎯 Best Practices

1. **Always use CSS variables** instead of hardcoded colors
2. **Test contrast ratios** for accessibility
3. **Keep consistent** - use the same color for similar elements
4. **Document changes** - update this guide when adding new themes

## 🔧 Adding Your Own Theme

To create a custom theme:

1. **Copy** an existing theme section
2. **Modify** the color values
3. **Update** the theme name and description
4. **Test** across all components
5. **Document** your new theme

## 🎨 Color Psychology Tips

- **Blue/Teal**: Trust, professionalism, calm
- **Green**: Growth, nature, success
- **Orange**: Energy, warmth, creativity
- **Purple**: Luxury, creativity, innovation
- **Neon**: Bold, modern, attention-grabbing

Choose colors that match your brand personality and target audience! 