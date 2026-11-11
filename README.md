# SoleDistrict

A premium sneaker storefront concept built as a responsive, frontend-only ecommerce demonstration. SoleDistrict pairs an editorial visual direction with a complete browsing, cart, wishlist, and checkout flow.

## Demo notice

This is a fictional storefront. Product names, brands, ratings, reviews, policies, and checkout behavior are sample content. No real orders are submitted, no payments are processed, and no card details are collected. Cart, wishlist, and discount state are stored locally in the browser.

## Tech stack

- Next.js App Router
- JavaScript
- React
- Tailwind CSS
- Lucide React
- Local sample product data
- `localStorage` persistence for cart, wishlist, and recently viewed products

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run start
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage with hero, categories, new arrivals, best sellers, brand story, newsletter, and footer |
| `/shop` | Full catalog with search, filters, sorting, and load more |
| `/product/[slug]` | Product gallery, variants, quantity, reviews, related products, and recently viewed |
| `/new-arrivals` | New product edit |
| `/best-sellers` | Best-selling product edit |
| `/wishlist` | Saved products with move-to-bag |
| `/cart` | Cart management, sample discount code, and order summary |
| `/checkout` | Frontend-only checkout with validation, review step, and demo confirmation |
| `/about` | Brand story, values, shipping and returns, size guide, and FAQ |

## Sample commerce rules

- Discount code: `SOLE10` for 10% off
- Free shipping estimate on orders over `$100`
- Flat `$8` shipping estimate under `$100`
- Quantity limits: `1–10` per line item
- Cart variants are separated by product, size, and color

## Features

- Responsive desktop, tablet, and mobile layouts
- Search, category, brand, price, size, color, and availability filters
- Product image gallery with zoom, lightbox, and thumbnails
- Quick add with required size selection
- Size validation and inline feedback
- Persistent cart and wishlist
- Slide-out cart drawer and toast notifications
- Sample reviews clearly labeled as illustrative
- Checkout field validation and accessible error messages
- Frontend demo confirmation without payment collection
- Reduced-motion support and keyboard-accessible controls
- Local image fallback handling

## Project structure

```text
app/                 Routes, layout, metadata, global styles
components/
  cart/              Cart page, drawer, line items, order summary
  checkout/          Checkout form, summary, demo confirmation
  home/              Homepage sections
  layout/            Announcement bar, navbar, menus, footer
  products/          Cards, filters, gallery, purchase panel, reviews
  ui/                Shared UI primitives
  wishlist/          Wishlist page content
context/             Cart, wishlist, and toast providers
data/                Sample product catalog
lib/                 Cart calculations, persistence, hooks, utilities
public/images/       Local product and editorial imagery
```

## Notes

- Product imagery is stored locally in `public/images` for reliable rendering.
- The catalog uses six fictional labels and eighteen sample products.
- Reviews and ratings are fictional sample data, not verified customer feedback.
- The checkout never renders real card fields and does not contact a payment provider.
