# Merry360X - Modern Travel Platform

A comprehensive, modern travel booking platform for accommodations, transportation, and tourism experiences across Rwanda and Africa. Built with Vue 3, Tailwind CSS, and a focus on clean, minimalist design.

## 🎨 Design Features

### Branding
- **Primary Color**: #F25757 (Coral Red)
- **Secondary**: White backgrounds
- **Text**: Black primary text
- **Accents**: Blue tones for CTAs and success states
- **Typography**: Inter font family, clean and modern
- **Style**: Minimalist, trust-centered, spacious layouts

### Platform Coverage
- ✅ **Website**: Fully responsive desktop and mobile web
- ✅ **Mobile-First**: Optimized for all screen sizes

## 🚀 Key Features

### 1. **Complete Onboarding Flow**
- Splash screen with animated branding
- Welcome slider with feature highlights
- Multi-language support (EN / RW / FR)
- Login, Signup, and Password Recovery
- Social authentication (Google, Facebook)

### 2. **Home & Discovery**
- Hero section with smart search
- Accommodation recommendations
- Featured tours and experiences
- Transportation shortcuts
- AI Concierge integration
- Seasonal highlights and promotions

### 3. **Accommodation Booking**
- Advanced filtering (price, type, amenities, rating)
- List view and Map view toggle
- Eco-friendly property filters
- Detailed property pages
- 360° Virtual Tours (VR/AR ready)
- Photo galleries
- Guest reviews
- Real-time availability
- Secure checkout with multiple payment options

### 4. **Transportation Services**
- Taxi booking
- Shuttle services
- Car rental options
- Real-time availability

### 5. **Tours & Experiences**
- Tour categories (Adventure, Cultural, Nature)
- Detailed itineraries
- Group size management
- Tour booking flow

### 6. **User Dashboard**
- Upcoming and past bookings
- Loyalty points tracking
- Saved items
- Membership tiers (Silver, Gold, Platinum)
- Payment receipts
- Account management

### 7. **Payment Integration**
- Credit/Debit cards
- Mobile Money
- **Blockchain payments** (Cryptocurrency wallet integration)
- Smart contract support
- Secure payment processing

### 8. **Sustainable Travel**
- Eco-friendly property labels
- Carbon footprint indicators
- Sustainability filters

### 9. **Admin Dashboard**
- Platform overview and analytics
- Property management
- User management
- Booking management
- Revenue tracking
- System settings

### 10. **Vendor Portal**
- Property listings management
- Media upload
- Booking calendar
- Revenue analytics
- Performance insights
- Payout settings

## 🛠 Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🗂 Project Structure

```
merry-360-design/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── common/         # Button, Card, Input, etc.
│   │   └── layout/         # MainLayout, Header, Footer
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia stores
│   ├── views/              # Page components
│   │   ├── onboarding/    # Login, Signup, Welcome
│   │   ├── home/          # Home page
│   │   ├── accommodation/ # Property listings & details
│   │   ├── transport/     # Transportation booking
│   │   ├── tours/         # Tour listings & details
│   │   ├── dashboard/     # User dashboard
│   │   ├── admin/         # Admin panel
│   │   └── vendor/        # Vendor portal
│   ├── App.vue            # Root component
│   ├── main.js            # Application entry
│   └── style.css          # Global styles
├── public/                # Public assets
├── index.html             # HTML entry
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md             # Documentation
```

## 🎯 Key Components

### Common Components
- **Button**: Multi-variant button with loading states
- **Card**: Container with hover effects and shadows
- **Input**: Form input with icons and validation
- **MainLayout**: Responsive layout with header and footer

### Design System
- Rounded cards (16px border radius)
- Smooth shadows
- Spacious sections
- Micro-animations
- Consistent spacing
- Mobile-optimized touch targets

## 🌐 Routes

### Public Routes
- `/` - Splash Screen
- `/welcome` - Welcome Slider
- `/login` - User Login
- `/signup` - User Signup
- `/forgot-password` - Password Recovery

### Main Application
- `/home` - Home Page
- `/accommodations` - Property Listings
- `/accommodation/:id` - Property Details
- `/accommodation/:id/checkout` - Checkout
- `/tours` - Tour Listings
- `/tour/:id` - Tour Details
- `/transport` - Transportation Services

### User Area
- `/dashboard` - User Dashboard

### Management
- `/admin` - Admin Dashboard
- `/vendor` - Vendor Portal

## 🎨 Design Tokens

```javascript
colors: {
  primary: '#F25757',      // Coral Red
  secondary: '#FFFFFF',     // White
  accent: {
    blue: '#3B82F6',       // Blue CTA
    'blue-dark': '#1E40AF',
    'blue-light': '#60A5FA'
  },
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Orange
  error: '#EF4444'         // Red
}
```

## 🔮 Future Features Roadmap

- [ ] AI Concierge chat interface
- [ ] VR/AR 360° virtual tours
- [ ] Local marketplace integration
- [ ] Social community features
- [ ] Trip matching & travel buddies
- [ ] Dynamic pricing alerts
- [ ] Predictive travel alerts
- [ ] Advanced analytics dashboard
- [ ] Multi-currency support
- [ ] Mobile app (React Native/Flutter)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

This is a design prototype. For contributions:

1. Follow the existing design system
2. Maintain consistent spacing and colors
3. Ensure mobile responsiveness
4. Add comments for complex logic
5. Test on multiple screen sizes

## 📄 License

Proprietary - Merry360X Platform

## 👥 Contact

For questions or support, contact the development team.

---

**Built with ❤️ for travelers across Africa**
