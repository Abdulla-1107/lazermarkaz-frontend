# Hunarmand E-Commerce Platform

Production-ready e-commerce website for eco-friendly laser-cut wood and plywood products.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **Multi-language Support**: Uzbek, English, Russian (i18next)
- **Theme System**: Dark/Light mode with system preference detection
- **Full E-commerce Flow**: Product catalog → Detail → Cart → Checkout → Order confirmation
- **Product Detail Page**: Gallery with lightbox, variants, customization (engraving), reviews
- **Order Modal**: One-click ordering with full validation and success flow
- **Cart Management**: Persistent cart (localStorage), cart drawer, quantity controls
- **Responsive Design**: Mobile-first, breakpoints at 640px, 1024px
- **SEO Optimized**: Meta tags, structured data, semantic HTML
- **Accessibility**: WCAG AA compliant, keyboard navigation, ARIA labels

## 📦 Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS + shadcn/ui
- React Router v6
- i18next for internationalization
- React Query for data fetching
- Sonner for toast notifications

## 🌍 Internationalization

Translation files located in `src/i18n/locales/`:
- `uz.json` - Uzbek (Latin)
- `en.json` - English
- `ru.json` - Russian

To add new translations:
1. Add keys to all three JSON files
2. Use `t('key.path')` in components

## 🎨 Theming

Design tokens defined in `src/index.css` using CSS variables:
- Colors: All HSL format for smooth theme transitions
- Spacing: Consistent scale (4, 8, 16, 24, 32, 48, 64px)
- Typography: System fonts with wood-craft aesthetic

Toggle theme: Click moon/sun icon in header

## 📱 Pages & Routes

- `/` - Home (hero, how-it-works, featured products, benefits)
- `/catalog` - Product catalog (filters, sorting, search)
- `/product/:id` - Product detail (gallery, variants, customization, order modal)
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/order-confirmation/:id` - Order success
- `/about` - Company story
- `/faq` - Frequently asked questions
- `/contact` - Contact form
- `/account` - User orders history
- `/admin` - Product upload (admin only)

## 🛒 Order Modal

Triggered from:
- Product detail "Order Now" button
- Cart "Quick Checkout"

Features:
- Product summary with customization
- Price breakdown (subtotal, shipping, total)
- Validated form (name, phone, email, address, delivery, payment)
- Loading state during processing
- Success confirmation with order number
- Focus trap and keyboard navigation

## 🔒 Form Validation

Client-side validation includes:
- Required field checks
- Email format validation
- Phone number length
- Terms acceptance requirement
- Real-time error display

## 📊 Sample Data

5 products included in `src/data/products.ts`:
1. Geometric Pattern Box (variants)
2. Custom Wall Sign (variants)
3. Corporate Gift Set
4. Small Box (Quticha 10x10x5 cm)
5. Photo Frame

To add products: Update `products` array or use Admin page

## 🎯 Environment Variables

Optional Stripe integration:
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 📝 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod
```

Build output: `dist/` folder

## ✅ Testing

Run manual tests:
1. Add product to cart
2. Open cart drawer
3. Update quantities
4. Click "Order Now" on product detail
5. Fill order form with validation errors
6. Submit successful order
7. Toggle theme and language

## 📄 License

© 2024 Hunarmand (Rahmanov Doniyor Abdusattorovich). All rights reserved.
