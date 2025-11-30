# 🎨 Merry360X Design System Reference

## Color Palette

### Primary Colors
```
🔴 Primary (Coral Red)
   HEX: #F25757
   RGB: rgb(242, 87, 87)
   Usage: Primary buttons, CTAs, brand elements
   Classes: bg-primary, text-primary, border-primary

⚪ Secondary (White)
   HEX: #FFFFFF
   RGB: rgb(255, 255, 255)
   Usage: Backgrounds, cards, contrast
   Classes: bg-white, text-white

⚫ Text Primary (Black)
   HEX: #000000
   RGB: rgb(0, 0, 0)
   Usage: Headlines, body text
   Classes: text-text-primary
```

### Accent Colors
```
🔵 Accent Blue
   HEX: #3B82F6
   RGB: rgb(59, 130, 246)
   Usage: Success CTAs, links, highlights
   Classes: bg-accent-blue, text-accent-blue

🟢 Success Green
   HEX: #10B981
   RGB: rgb(16, 185, 129)
   Usage: Success states, eco-labels
   Classes: bg-success, text-success

🟠 Warning Orange
   HEX: #F59E0B
   RGB: rgb(245, 158, 11)
   Usage: Warnings, pending states
   Classes: bg-warning, text-warning

🔴 Error Red
   HEX: #EF4444
   RGB: rgb(239, 68, 68)
   Usage: Errors, validation
   Classes: bg-error, text-error
```

### Grayscale
```
⬛ Gray 900: #111827 (Darkest)
⬛ Gray 700: #374151
⬛ Gray 500: #6B7280
⬛ Gray 300: #D1D5DB
⬛ Gray 100: #F3F4F6
⬜ Gray 50:  #F9FAFB (Lightest)
```

## Typography

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Scale
```
text-xs:   0.75rem  (12px)
text-sm:   0.875rem (14px)
text-base: 1rem     (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem  (20px)
text-2xl:  1.5rem   (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem  (36px)
text-5xl:  3rem     (48px)
text-6xl:  3.75rem  (60px)
```

### Font Weights
```
font-light:     300
font-normal:    400
font-medium:    500
font-semibold:  600
font-bold:      700
```

## Spacing System

### Padding & Margin
```
p-0:  0px
p-1:  0.25rem (4px)
p-2:  0.5rem  (8px)
p-3:  0.75rem (12px)
p-4:  1rem    (16px)
p-6:  1.5rem  (24px)
p-8:  2rem    (32px)
p-12: 3rem    (48px)
p-16: 4rem    (64px)
```

## Border Radius

### Custom Radii
```
rounded:        0.25rem (4px)
rounded-lg:     0.5rem  (8px)
rounded-button: 12px    (Custom - buttons)
rounded-card:   16px    (Custom - cards)
rounded-xl:     0.75rem (12px)
rounded-2xl:    1rem    (16px)
rounded-3xl:    1.5rem  (24px)
rounded-full:   9999px  (Circle)
```

## Shadows

### Shadow System
```css
shadow-sm:         Subtle
shadow:            Default
shadow-md:         Medium
shadow-lg:         Large
shadow-xl:         Extra Large
shadow-card:       Custom card shadow
shadow-card-hover: Elevated card shadow
```

## Component Sizes

### Button Sizes
```
size="sm"  → px-4 py-2 text-sm
size="md"  → px-6 py-3 text-base
size="lg"  → px-8 py-4 text-lg
```

### Button Variants
```vue
<Button variant="primary">Primary Action</Button>
<!-- Coral red background, white text -->

<Button variant="secondary">Secondary</Button>
<!-- Gray background, black text -->

<Button variant="outline">Outline</Button>
<!-- Border only, transparent background -->

<Button variant="text">Text Button</Button>
<!-- No background, colored text -->

<Button variant="success">Success</Button>
<!-- Blue background, white text -->
```

### Card Padding
```vue
<Card padding="none">No padding</Card>
<Card padding="sm">p-4</Card>
<Card padding="md">p-6</Card>
<Card padding="lg">p-8</Card>
```

## Layouts

### Container
```css
container mx-auto px-4 lg:px-8
/* Centers content, responsive padding */
```

### Grid Systems
```vue
<!-- 2 columns on mobile, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6">

<!-- Responsive layout -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
```

### Flexbox Patterns
```vue
<!-- Center align -->
<div class="flex items-center justify-center">

<!-- Space between -->
<div class="flex items-center justify-between">

<!-- Vertical stack with gap -->
<div class="flex flex-col gap-4">
```

## Icons

### Icon Size Classes
```
w-4 h-4  → 16px (Small)
w-5 h-5  → 20px (Default)
w-6 h-6  → 24px (Medium)
w-8 h-8  → 32px (Large)
w-12 h-12 → 48px (Extra Large)
```

## Responsive Breakpoints

```css
/* Mobile First */
/* Default: 0px - 767px */

sm:  640px  @media (min-width: 640px)
md:  768px  @media (min-width: 768px)
lg:  1024px @media (min-width: 1024px)
xl:  1280px @media (min-width: 1280px)
2xl: 1536px @media (min-width: 1536px)
```

### Usage Example
```vue
<div class="
  w-full           /* Mobile: full width */
  md:w-1/2         /* Tablet: half width */
  lg:w-1/3         /* Desktop: third width */
">
```

## Animations

### Fade In
```vue
<div class="animate-fade-in">
  <!-- Fades in with upward motion -->
</div>
```

### Slide In
```vue
<div class="animate-slide-in">
  <!-- Slides in from left -->
</div>
```

### Hover Effects
```css
hover:shadow-lg
hover:scale-105
hover:bg-opacity-90
hover:border-primary
transition-all duration-200
```

## Common Patterns

### Card with Hover
```vue
<Card hover clickable padding="lg">
  <!-- Elevates on hover, cursor pointer -->
</Card>
```

### Primary Button
```vue
<Button 
  variant="primary" 
  size="lg" 
  full-width
  :loading="isSubmitting"
>
  Submit
</Button>
```

### Input with Icon
```vue
<Input
  v-model="email"
  type="email"
  placeholder="Email address"
  :icon="emailIcon"
  :error="emailError"
/>
```

### Status Badge
```vue
<span class="
  px-3 py-1 
  bg-success bg-opacity-10 
  text-success 
  text-xs font-medium 
  rounded-full
">
  Confirmed
</span>
```

### Image Card
```vue
<div class="relative h-64 rounded-card overflow-hidden">
  <img src="..." class="w-full h-full object-cover" />
  <div class="absolute inset-0 bg-gradient-to-t from-black/60" />
</div>
```

## Accessibility

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-accent-blue
focus:ring-opacity-20
```

### Color Contrast
- All text meets WCAG AA standards
- Primary on white: 4.5:1+ ratio
- White on primary: 4.5:1+ ratio

### Touch Targets
- Minimum 44px × 44px on mobile
- Adequate spacing between interactive elements

## Quick Copy-Paste Snippets

### Hero Section
```vue
<section class="bg-gradient-to-br from-primary to-accent-blue text-white py-20">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-5xl font-bold mb-4">Hero Title</h1>
    <p class="text-xl mb-8">Subtitle text</p>
  </div>
</section>
```

### Stats Card
```vue
<Card padding="md">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-text-secondary text-sm mb-1">Label</p>
      <p class="text-3xl font-bold text-primary">1,234</p>
    </div>
    <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
      <!-- Icon -->
    </div>
  </div>
</Card>
```

### Feature Card
```vue
<Card hover clickable padding="lg" class="text-center">
  <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
    <!-- Icon -->
  </div>
  <h3 class="text-xl font-semibold mb-2">Title</h3>
  <p class="text-text-secondary">Description</p>
</Card>
```

---

## 🎯 Design Principles

1. **Simplicity First** - Remove unnecessary elements
2. **Clear Hierarchy** - Size and weight indicate importance
3. **Consistent Spacing** - Use multiples of 4px
4. **Purposeful Color** - Every color has meaning
5. **Responsive Always** - Mobile-first approach
6. **Accessible Design** - Consider all users

## 📐 Grid & Layout Rules

- Max content width: 1280px (container)
- Gutter: 1.5rem (24px) on mobile, 2rem (32px) on desktop
- Column gap: 1.5rem (24px)
- Section padding: 4rem (64px) vertical

## ✅ Component Checklist

When creating new components:
- [ ] Mobile responsive
- [ ] Hover/focus states
- [ ] Loading states (if applicable)
- [ ] Error states (if applicable)
- [ ] Keyboard accessible
- [ ] Color contrast verified
- [ ] Consistent with design system

---

**Use this guide to maintain design consistency across all new features!**
