# PulseHealth - Constitution

## Mission
To empower individuals on their wellness journeys by providing accessible health calculators, a persistent fitness logging dashboard, a curated wellness blog, and an intelligent chatbot companion built with state-of-the-art web technology.

## Core Principles
1. **Accessibility & Clarity**: Healthcare information must be easily digestible, visually clear, and screen-reader accessible.
2. **Privacy & Trust**: User tracking data (fitness logs) are stored client-side in LocalStorage, prioritizing user data ownership.
3. **Interactive & Responsive**: Every view must adapt beautifully to any screen width and contain rich micro-animations that feel premium and responsive.
4. **Intelligent Companion**: The AI Chatbot must provide context-aware, helpful, and safe information about the application contents.

## Technical Standards
- **Framework**: Next.js 14+ (App Router) for hybrid routing and fast loading.
- **Language**: TypeScript for compile-time type-safety and robust refactoring.
- **Styles**: Tailwind CSS using custom color tokens (Emerald, Teal, Slate).
- **Icons**: Lucide React for modern, vector-based line icons.
- **State Management**: React `useState` / `useEffect` persisted to LocalStorage for tracking.

## Design Guidelines
- **Color Palette**: Clean clinical slate background with vibrant emerald and teal highlights representing vitality and nature.
- **Typography**: Modern geometric sans-serif typeface (Inter/Outfit style).
- **Glassmorphism**: Elegant card borders, subtle shadows, and `backdrop-filter: blur(12px)` for premium layouts.
- **Micro-animations**: Smooth hover transitions (`transition-all duration-300`) on all interactive cards, links, and buttons.
