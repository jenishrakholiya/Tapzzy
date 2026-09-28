# Tapzyy — Smart NFC & QR Growth Storefront & Admin Portal

Tapzyy is a modern e-commerce storefront and admin control platform for smart NFC/QR review cards designed for businesses across India. Built with React 19, Vite, and React Router 7, styled with high-performance responsive CSS, and connected with Supabase.

---

## 🚀 Systematic Branching & Deployment Strategy

This repository enforces a strict, systematic Git workflow for development, staging, and production:

```
feature/<feature-name> (Active Development & Bug Fixes)
         │
         ▼  (Pull Request / Merge)
      develop           (Integration & Staging)
         │
         ▼  (Release Merge)
       main             (Production Branch ➔ Deploys to Vercel)
```

### Workflow Rules:
1. **Feature / Working Branches (`feature/*`)**:
   - Every new feature, UI enhancement, or bug fix starts on a dedicated branch created from `develop`:
     ```bash
     git checkout develop
     git pull origin develop
     git checkout -b feature/your-feature-name
     ```
   - Commit and push your changes to `feature/your-feature-name`.

2. **Integration Branch (`develop`)**:
   - Once tested, merge the feature branch into `develop`:
     ```bash
     git checkout develop
     git pull origin develop
     git merge feature/your-feature-name
     git push origin develop
     ```

3. **Production Branch (`main`)**:
   - Production releases are merged from `develop` into `main`:
     ```bash
     git checkout main
     git pull origin main
     git merge develop
     git push origin main
     ```
   - **Vercel triggers automatic production deployment on every push to `main`**.

---

## ⚡ Vercel Deployment Guide

1. **Connect Repository**: Import `https://github.com/jenishrakholiya/Tapzzy.git` on [Vercel](https://vercel.com).
2. **Production Branch**: Set **`main`** as your Production Branch.
3. **Framework Preset**: Vite (detected automatically via `vercel.json`).
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variables**:
   Add the following variables in **Project Settings ➔ Environment Variables**:
   ```env
   VITE_SUPABASE_URL=https://rvlvvrpdpgmkftwbigwi.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_TaJtkoTtVk4TWR2MXEQ9pg_qtcbDbyi
   NEXT_PUBLIC_SUPABASE_URL=https://rvlvvrpdpgmkftwbigwi.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_TaJtkoTtVk4TWR2MXEQ9pg_qtcbDbyi
   ```
7. **Client-Side Routing (`vercel.json`)**:
   Included in the root directory to handle SPA rewrites (`/(.*) -> /index.html`) so refreshing any route (`/shop`, `/cart`, etc.) loads without 404 errors.

---

## 🗄️ Supabase & Database Configuration

The project is pre-configured with Supabase client integration in `src/lib/supabaseClient.js`.

### Client API Keys:
- **Supabase URL**: `https://rvlvvrpdpgmkftwbigwi.supabase.co`
- **Publishable Key**: `sb_publishable_TaJtkoTtVk4TWR2MXEQ9pg_qtcbDbyi`

### Direct PostgreSQL Connection:
- **Host**: `db.rvlvvrpdpgmkftwbigwi.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server (http://localhost:5173)
npm run dev

# 3. Run lint checks
npm run lint

# 4. Create production build
npm run build

# 5. Preview production build
npm run preview
```

---

## 📱 Mobile Responsiveness & Architecture

- **Safe Area Insets**: Full support for iOS notch and Android edge-to-edge system bars.
- **Dynamic Touch Controls**: 44px+ touch targets across all mobile viewports (320px, 375px, 412px, 768px+).
- **Responsive Grids**: Auto-fitting responsive columns avoiding horizontal overflow.
- **Sticky CTA Navigation**: Mobile checkout and buy buttons stick above the device navigation bar on product pages.
