# Hunarmand Design System

## 🎨 Color Palette

### Light Mode
```css
--background: 35 25% 97%        /* Warm cream */
--foreground: 25 20% 20%        /* Dark brown */
--primary: 25 45% 35%           /* Rich wood brown */
--secondary: 35 35% 92%         /* Soft cream */
--accent: 350 65% 75%           /* Blush pink */
--muted: 35 25% 90%             /* Warm gray */
--success: 142 76% 36%          /* Green */
--warning: 38 92% 50%           /* Orange */
```

### Dark Mode
```css
--background: 25 15% 12%        /* Deep charcoal */
--foreground: 35 20% 92%        /* Light cream */
--primary: 35 55% 65%           /* Lighter wood */
--accent: 350 55% 60%           /* Softer blush */
```

## 📏 Spacing Scale

```
4px   - xs
8px   - sm
16px  - md
24px  - lg
32px  - xl
48px  - 2xl
64px  - 3xl
```

## ✍️ Typography

### Font Families
- **Headings**: System sans-serif stack
- **Body**: System sans-serif stack
- **Monospace**: System monospace (order numbers)

### Font Sizes
```
text-xs:   0.75rem (12px)
text-sm:   0.875rem (14px)
text-base: 1rem (16px)
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem (36px)
```

## 🔘 Components

### Buttons
```tsx
// Primary CTA
<Button>Order Now</Button>

// Secondary action
<Button variant="outline">Add to Cart</Button>

// Destructive
<Button variant="destructive">Remove</Button>
```

### Cards
```tsx
<Card>
  <CardContent>Content</CardContent>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Badges
```tsx
<Badge>Category</Badge>
<Badge variant="secondary">In Stock</Badge>
<Badge variant="destructive">Out of Stock</Badge>
```

## 📐 Layout

### Container
Max-width: 1280px
Padding: 2rem (32px)

### Grid Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 641-1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

## 🎭 Animations

```css
/* Fade in */
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Hover scale */
.hover-scale:hover {
  transform: scale(1.05);
}
```

## ♿ Accessibility

- **Contrast**: WCAG AA minimum (4.5:1 text, 3:1 UI)
- **Focus**: Visible outline on all interactive elements
- **ARIA**: Labels on icons, modals, and forms
- **Keyboard**: Tab navigation, Escape to close

## 🌍 Responsive Patterns

### Mobile-First
Start with mobile styles, add breakpoints:
```tsx
className="w-full md:w-1/2 lg:w-1/3"
```

### Hide/Show
```tsx
className="hidden sm:block"  // Hide on mobile
className="sm:hidden"         // Show only mobile
```

## 📱 Touch Targets

Minimum 44x44px (iOS) / 48x48px (Android)
```tsx
<Button size="icon" className="h-12 w-12">
```
