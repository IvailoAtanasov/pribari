# При Бари - Next.js 15 Migration Plan

## Project Overview
Migration of the static HTML cake business website (IvailoAtanasov.github.io) to a modern Next.js 15 application with TailwindCSS, Sanity CMS, Clerk authentication, Mailchimp integration, Google Maps, and Google Analytics.

---

## Current Site Structure Analysis

### Pages
- **index.html** - Homepage with hero slider, about section, featured menu items, contact info, Google Map
- **menu.html** - Full menu with filterable categories (Торти, Сладки Специалитети, Домашни Бисквити, Шоколад)
- **specials.html** - Special occasion cakes (weddings, birthdays)
- **ketering.html** - Catering services page

### Content Types Identified
- **Products/Menu Items**: name, description, price, image, category
- **Hero Slides**: image, title, subtitle, CTA
- **About Section**: title, description, image
- **Contact Info**: phone, email, address
- **Business Hours**: day ranges, times
- **Social Links**: Facebook, Instagram

### Assets
- 60+ images in `/images/` folder
- Custom CSS styling
- Google Maps integration (coordinates: 42.713219, 23.246146)

---

## Phase 1: Project Setup

### Task 1.1: Initialize Next.js 15 Project
- [ ] Create Next.js 15 app with App Router
- [ ] Configure TypeScript
- [ ] Set up TailwindCSS v4
- [ ] Install and configure shadcn/ui components
- [ ] Set up project folder structure

```bash
npx create-next-app@latest PriBariNextJs --typescript --tailwind --eslint --app --src-dir
```

### Task 1.2: Project Structure
```
PriBariNextJs/
├── src/
│   ├── app/
│   │   ├── (site)/              # Public pages
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── menu/page.tsx
│   │   │   ├── specials/page.tsx
│   │   │   ├── catering/page.tsx
│   │   │   └── layout.tsx
│   │   ├── admin/               # Protected admin area
│   │   │   └── [[...index]]/page.tsx  # Sanity Studio
│   │   ├── api/
│   │   │   ├── newsletter/route.ts    # Mailchimp API
│   │   │   └── revalidate/route.ts    # Sanity webhook
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── home/
│   │   │   ├── HeroSlider.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── FeaturedMenu.tsx
│   │   ├── menu/
│   │   │   ├── MenuGrid.tsx
│   │   │   ├── MenuFilter.tsx
│   │   │   └── ProductCard.tsx
│   │   ├── GoogleMap.tsx
│   │   └── NewsletterForm.tsx
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── image.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── sanity/
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── heroSlide.ts
│   │   ├── aboutSection.ts
│   │   └── siteSettings.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── public/
│   └── images/                  # Migrated images
└── .env.local
```

### Task 1.3: Environment Variables Setup
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Mailchimp
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
MAILCHIMP_API_SERVER=

# Google
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## Phase 2: Sanity CMS Integration

### Task 2.1: Initialize Sanity
- [ ] Install Sanity dependencies
- [ ] Create Sanity project (or use existing)
- [ ] Configure sanity.config.ts for embedded studio

```bash
npm install sanity @sanity/vision @sanity/image-url next-sanity
```

### Task 2.2: Define Sanity Schemas

#### Product Schema
```typescript
// sanity/schemas/product.ts
{
  name: 'product',
  title: 'Продукт',
  type: 'document',
  fields: [
    { name: 'name', title: 'Име', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', title: 'Описание', type: 'text' },
    { name: 'price', title: 'Цена', type: 'string' },
    { name: 'image', title: 'Снимка', type: 'image' },
    { name: 'category', title: 'Категория', type: 'reference', to: [{ type: 'category' }] },
    { name: 'featured', title: 'Показвай на началната страница', type: 'boolean' },
    { name: 'order', title: 'Подредба', type: 'number' }
  ]
}
```

#### Category Schema
```typescript
// sanity/schemas/category.ts
{
  name: 'category',
  title: 'Категория',
  type: 'document',
  fields: [
    { name: 'name', title: 'Име', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug' },
    { name: 'page', title: 'Страница', type: 'string', options: { list: ['menu', 'specials'] } }
  ]
}
```

#### Hero Slide Schema
```typescript
// sanity/schemas/heroSlide.ts
{
  name: 'heroSlide',
  title: 'Hero Слайд',
  type: 'document',
  fields: [
    { name: 'image', title: 'Снимка', type: 'image' },
    { name: 'title', title: 'Заглавие', type: 'string' },
    { name: 'subtitle', title: 'Подзаглавие', type: 'text' },
    { name: 'ctaText', title: 'Бутон текст', type: 'string' },
    { name: 'ctaLink', title: 'Бутон линк', type: 'string' },
    { name: 'order', title: 'Подредба', type: 'number' }
  ]
}
```

#### Site Settings Schema
```typescript
// sanity/schemas/siteSettings.ts
{
  name: 'siteSettings',
  title: 'Настройки на сайта',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Име на сайта', type: 'string' },
    { name: 'logo', title: 'Лого', type: 'image' },
    { name: 'phone', title: 'Телефон', type: 'string' },
    { name: 'email', title: 'Имейл', type: 'string' },
    { name: 'address', title: 'Адрес', type: 'string' },
    { name: 'mapCoordinates', title: 'Координати', type: 'object', fields: [
      { name: 'lat', type: 'number' },
      { name: 'lng', type: 'number' }
    ]},
    { name: 'businessHours', title: 'Работно време', type: 'array', of: [{ type: 'object', fields: [
      { name: 'days', type: 'string' },
      { name: 'hours', type: 'string' }
    ]}]},
    { name: 'socialLinks', title: 'Социални мрежи', type: 'object', fields: [
      { name: 'facebook', type: 'url' },
      { name: 'instagram', type: 'url' }
    ]},
    { name: 'aboutTitle', title: 'За нас - Заглавие', type: 'string' },
    { name: 'aboutText', title: 'За нас - Текст', type: 'array', of: [{ type: 'block' }] },
    { name: 'aboutImage', title: 'За нас - Снимка', type: 'image' }
  ]
}
```

### Task 2.3: Embed Sanity Studio
- [ ] Create `/admin` route with Sanity Studio
- [ ] Configure studio with custom branding
- [ ] Set up CORS for Sanity project

```typescript
// src/app/admin/[[...index]]/page.tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function AdminPage() {
  return <NextStudio config={config} />
}
```

### Task 2.4: Create Sanity Client & Queries
- [ ] Set up Sanity client with proper configuration
- [ ] Create GROQ queries for all content types
- [ ] Implement image URL builder

---

## Phase 3: Clerk Authentication

### Task 3.1: Install & Configure Clerk
- [ ] Install Clerk SDK
- [ ] Create Clerk application
- [ ] Configure middleware for protected routes

```bash
npm install @clerk/nextjs
```

### Task 3.2: Protect Admin Route
- [ ] Create middleware.ts to protect /admin routes
- [ ] Configure Clerk provider in layout
- [ ] Set up admin-only access (whitelist specific users)

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth().protect()
  }
})
```

### Task 3.3: Admin Access Control
- [ ] Create admin user whitelist in environment variables
- [ ] Implement role-based access check
- [ ] Add sign-in/sign-out UI for admin

---

## Phase 4: Mailchimp Integration

### Task 4.1: Set Up Mailchimp API
- [ ] Create Mailchimp account/audience
- [ ] Get API credentials
- [ ] Install Mailchimp SDK

```bash
npm install @mailchimp/mailchimp_marketing
```

### Task 4.2: Create Newsletter API Route
```typescript
// src/app/api/newsletter/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER
})

export async function POST(request: Request) {
  const { email } = await request.json()
  
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
      email_address: email,
      status: 'subscribed'
    })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
```

### Task 4.3: Create Newsletter Component
- [ ] Build email subscription form
- [ ] Add form validation
- [ ] Implement success/error states
- [ ] Add to footer

---

## Phase 5: Google Integrations

### Task 5.1: Google Maps Component
- [ ] Install Google Maps library
- [ ] Create reusable GoogleMap component
- [ ] Configure with business location (42.713219, 23.246146)
- [ ] Add custom marker

```bash
npm install @react-google-maps/api
```

```typescript
// src/components/GoogleMap.tsx
'use client'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const center = { lat: 42.713219, lng: 23.246146 }

export default function Map() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={{ width: '100%', height: '400px' }} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}
```

### Task 5.2: Google Analytics Integration
- [ ] Create GA4 property
- [ ] Install gtag or @next/third-parties
- [ ] Add GA script to layout
- [ ] Configure page view tracking

```bash
npm install @next/third-parties
```

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  )
}
```

---

## Phase 6: UI Components & Pages

### Task 6.1: Layout Components
- [ ] Header with navigation (responsive)
- [ ] Footer with contact info, hours, social links, newsletter
- [ ] Mobile menu

### Task 6.2: Homepage Components
- [ ] Hero slider with auto-play
- [ ] About section
- [ ] Featured products grid with filtering
- [ ] Contact info section
- [ ] Google Map

### Task 6.3: Menu Page
- [ ] Category filter buttons
- [ ] Product grid with animations
- [ ] Product cards with image, name, description, price

### Task 6.4: Specials Page
- [ ] Special occasion info section
- [ ] Category filters (Сватби, Рожденни дни, Други)
- [ ] Product gallery

### Task 6.5: Catering Page
- [ ] Hero section with CTA
- [ ] Contact information

---

## Phase 7: Styling & Assets

### Task 7.1: TailwindCSS Configuration
- [ ] Configure custom colors matching original design
- [ ] Set up custom fonts
- [ ] Create responsive breakpoints

### Task 7.2: Migrate Assets
- [ ] Copy all images to public/images
- [ ] Optimize images with next/image
- [ ] Upload images to Sanity (optional)

### Task 7.3: Custom Styling
- [ ] Match original design aesthetic
- [ ] Implement hover effects
- [ ] Add smooth transitions
- [ ] Ensure mobile responsiveness

---

## Phase 8: Content Migration

### Task 8.1: Migrate Products to Sanity
- [ ] Create categories in Sanity
- [ ] Add all menu items with images
- [ ] Add special occasion cakes
- [ ] Set featured items

### Task 8.2: Migrate Site Settings
- [ ] Add business information
- [ ] Upload logo
- [ ] Configure business hours
- [ ] Add social links

### Task 8.3: Create Hero Slides
- [ ] Add 3 hero slides with images and text

---

## Phase 9: Testing & Deployment

### Task 9.1: Testing
- [ ] Test all pages render correctly
- [ ] Test Sanity Studio access (admin only)
- [ ] Test newsletter subscription
- [ ] Test Google Maps
- [ ] Test responsive design
- [ ] Test Clerk authentication flow

### Task 9.2: Performance Optimization
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Optimize images
- [ ] Add loading states
- [ ] Configure caching

### Task 9.3: Deployment
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Set up Sanity webhook for revalidation
- [ ] Configure custom domain (optional)

---

## Dependencies Summary

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sanity": "^3.x",
    "next-sanity": "^9.x",
    "@sanity/image-url": "^1.x",
    "@clerk/nextjs": "^5.x",
    "@mailchimp/mailchimp_marketing": "^3.x",
    "@react-google-maps/api": "^2.x",
    "@next/third-parties": "^15.x",
    "tailwindcss": "^4.x",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
```

---

## Timeline Estimate

| Phase | Description | Estimated Time |
|-------|-------------|----------------|
| 1 | Project Setup | 1-2 hours |
| 2 | Sanity CMS Integration | 3-4 hours |
| 3 | Clerk Authentication | 1-2 hours |
| 4 | Mailchimp Integration | 1 hour |
| 5 | Google Integrations | 1-2 hours |
| 6 | UI Components & Pages | 4-6 hours |
| 7 | Styling & Assets | 2-3 hours |
| 8 | Content Migration | 2-3 hours |
| 9 | Testing & Deployment | 2-3 hours |
| **Total** | | **17-26 hours** |

---

## Notes

- **Bulgarian Language**: All UI text should be in Bulgarian
- **Existing Google Maps API Key**: `AIzaSyDoPUg43k_jyQqf0Zlio0UBr23XfCOxJ1w` (from original site - verify if still valid)
- **Business Location**: Люлин 8, ул. Генерал Казимир Ернрод 34, Sofia, Bulgaria
- **Contact**: +359 885 650 835, deal_company@abv.bg
- **Social**: Facebook (torti.priBari), Instagram (sladkarskakashta)
