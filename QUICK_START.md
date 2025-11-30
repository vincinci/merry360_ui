# 🚀 Merry360X - Quick Start Guide

## Instant Setup (3 Steps)

```bash
# 1. Navigate to project
cd /Users/davy/Merry_360_design

# 2. Install (if not done)
npm install

# 3. Run
npm run dev
```

**Access**: http://localhost:5173/

## 🗺️ Navigation Map

### Public Pages
- **/** → Splash Screen (auto-redirects to /welcome after 2.5s)
- **/welcome** → Onboarding slider (3 slides)
- **/login** → Sign in (test: any email/password works in demo)
- **/signup** → Create account
- **/forgot-password** → Password recovery

### Main App (After Login)
- **/home** → Main dashboard
- **/accommodations** → Browse properties
- **/accommodation/1** → View property details
- **/accommodation/1/checkout** → Book & pay
- **/tours** → Explore tours
- **/transport** → Transportation services
- **/dashboard** → User profile & bookings

### Admin & Vendor
- **/admin** → Admin control panel
- **/vendor** → Vendor property management

## 🎨 Design Tokens

```javascript
// Primary Colors
primary: '#F25757'    // Coral red
blue: '#3B82F6'       // Accent blue
success: '#10B981'    // Green
white: '#FFFFFF'      // Background

// Usage in Tailwind
<div class="bg-primary text-white">...</div>
<Button variant="success">Book Now</Button>
```

## 🧩 Component Usage

### Button
```vue
<Button variant="primary" size="lg" :loading="isLoading">
  Click Me
</Button>
<!-- Variants: primary, secondary, outline, text, success -->
```

### Card
```vue
<Card padding="lg" hover clickable>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Input
```vue
<Input 
  v-model="email" 
  type="email" 
  placeholder="Email"
  :icon="emailIcon"
  :error="errorMessage"
/>
```

## 📱 Key Features to Test

### 1. Home Page
- [ ] Search functionality
- [ ] Click on accommodation cards
- [ ] View tours
- [ ] Transport shortcuts
- [ ] AI Concierge button
- [ ] Responsive resize

### 2. Accommodations
- [ ] Apply filters (price, type, amenities)
- [ ] Toggle list/map view
- [ ] Click property card
- [ ] View 360° tour placeholder
- [ ] Add to favorites
- [ ] Proceed to checkout

### 3. Checkout
- [ ] Fill guest info
- [ ] Switch payment methods
- [ ] Try blockchain option
- [ ] Complete booking

### 4. User Dashboard
- [ ] View stats
- [ ] Check upcoming bookings
- [ ] Loyalty points
- [ ] Membership tier

### 5. Admin Panel
- [ ] Navigate sidebar
- [ ] View analytics
- [ ] Browse recent bookings

### 6. Responsive Design
- [ ] Resize browser (mobile → desktop)
- [ ] Test mobile menu
- [ ] Check touch targets
- [ ] Verify layouts adapt

## 🎯 Demo Flow

**Complete User Journey** (5 minutes):

1. Open http://localhost:5173/
2. Watch splash → welcome slides → skip to login
3. Enter any email/password → click Sign In
4. Browse home page recommendations
5. Click an accommodation → view details
6. Click "Reserve Now" → complete checkout form
7. Go to /dashboard → see your booking
8. Try /admin → explore admin features
9. Try /vendor → see vendor portal

## 🔧 Customization Points

### Change Primary Color
```javascript
// tailwind.config.js
colors: {
  primary: '#YOUR_COLOR', // Change this
}
```

### Add New Route
```javascript
// src/router/index.js
{
  path: '/your-page',
  name: 'your-page',
  component: YourComponent
}
```

### Add Functionality
```javascript
// src/stores/app.js
// Add your state management here
```

## 📊 Project Structure at a Glance

```
src/
├── components/
│   ├── common/         ← Button, Card, Input
│   └── layout/         ← MainLayout (header/footer)
├── views/
│   ├── onboarding/     ← Login, Signup, etc.
│   ├── home/           ← Home page
│   ├── accommodation/  ← Property pages
│   └── ...
├── router/             ← All routes
├── stores/             ← Pinia state
└── App.vue             ← Root component
```

## 💡 Pro Tips

1. **Dark Mode**: Ready structure, add theme toggle in stores/app.js
2. **Real Data**: Replace static arrays in views with API calls
3. **Images**: Replace placeholder URLs with actual property images
4. **Validation**: Extend form validation in onboarding views
5. **Animations**: CSS animations defined in style.css

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Tailwind Not Working
```bash
# Restart dev server
npm run dev
```

### Router Not Loading
- Check console for errors
- Ensure all view files exist
- Verify import paths

## 📚 Key Files

- **tailwind.config.js** - Design tokens, colors
- **src/router/index.js** - All routes
- **src/stores/app.js** - Global state
- **src/components/layout/MainLayout.vue** - Header/footer
- **src/views/home/Home.vue** - Main page

## 🎨 Color Reference

| Usage | Color | Hex |
|-------|-------|-----|
| Primary Actions | Coral Red | #F25757 |
| Secondary Actions | Blue | #3B82F6 |
| Success States | Green | #10B981 |
| Warnings | Orange | #F59E0B |
| Errors | Red | #EF4444 |
| Background | White | #FFFFFF |
| Text Primary | Black | #000000 |
| Text Secondary | Gray | #4B5563 |

## 🚀 Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview

# Output in: dist/
```

## 📦 What's Included

✅ 20+ responsive screens
✅ 14 routes configured  
✅ 6 reusable components
✅ Complete design system
✅ Authentication flows
✅ Booking systems
✅ Admin & vendor panels
✅ Payment integration UI
✅ Responsive layouts
✅ Animations & transitions

## 🎉 You're All Set!

The application is **running** and **ready** for:
- User testing
- Feature additions
- Backend integration
- Deployment

**Start exploring at:** http://localhost:5173/

---

**Need Help?** Check PROJECT_DOCUMENTATION.md for detailed info!
