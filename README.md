# ANNAJJANE — Portfolio & Store

A cinematic, scroll-driven portfolio and print store for Anna Jane Baum’s paintings. The experience prioritizes visual immersion: users move *into* the work rather than scrolling past it.

---

## Core Concept

The site is divided into two phases:

1. **Cinematic Entry (Scroll Narrative)**
   - Soft painted cloud environment (light blue + matte texture)
   - “ANNAJJANE” fades as user scrolls forward
   - 3 paintings revealed sequentially
   - Each painting splits open along a custom silhouette (“barn door” effect)
   - The next painting is revealed *behind* the split (no empty space)

2. **Gallery / Store**
   - Clean off-white background
   - Structured grid of paintings
   - Sticky header with “ANNAJJANE”
   - Click → dedicated product page
   - Stripe Checkout for purchase

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animation)
- Stripe Checkout (hosted)
- Vercel deployment

---

## Project Structure

```text
app/
  page.tsx                # main scroll experience + gallery
  painting/[slug]/page.tsx  # product pages

components/
  CloudHero.tsx
  ScrollStage.tsx
  PaintingReveal.tsx
  GalleryGrid.tsx
  Header.tsx

lib/
  paintings.ts           # data source
  stripe.ts              # checkout logic

public/
  paintings/
  masks/                 # silhouette masks

styles/
  globals.css
  