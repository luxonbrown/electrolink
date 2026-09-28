/**
 * Mock product catalogue.
 *
 * Prices are plain numbers in Rwandan Francs. `savings` and `commission` are
 * derived from the price pair so the numbers on a card can never disagree with
 * each other — the card only ever renders what these helpers produce.
 */

import { formatNumber } from '../lib/format.js'

/** How much the shopper saves, in RWF. */
export function savingsFor(product) {
  return product.originalPrice - product.price
}

/** Off-peak discount percentage, rounded to a whole number. */
export function discountFor(product) {
  return Math.round((savingsFor(product) / product.originalPrice) * 100)
}

/** Affiliate commission the promoter earns on this product, in RWF. */
export function commissionFor(product) {
  return Math.round(savingsFor(product) * 0.08)
}

/** `{ label: 'RWF 250,000' }` for the "Earn" line on a card. */
export function formatCommission(product) {
  return `RWF ${formatNumber(commissionFor(product))}`
}

const BADGE_STYLES = {
  hot: 'bg-red-600 text-white',
  bestseller: 'bg-orange-500 text-white',
  popular: 'bg-purple-600 text-white',
  new: 'bg-brand-600 text-white',
}

/** Badge label + Tailwind classes, or null when a product has no badge. */
export function badgeFor(product) {
  if (!product.badge) return null
  return { label: product.badge, className: BADGE_STYLES[product.badge] ?? BADGE_STYLES.new }
}

const img = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/** Products rendered in "🔥 Best Deals This Week". */
export const bestDeals = [
  {
    id: 'deal-01',
    slug: 'apple-iphone-15-pro-256gb',
    title: 'Apple iPhone 15 Pro 256GB',
    specs: 'A17 Pro • 6.1" • Titanium • 1 Year Warranty',
    price: 1450000,
    originalPrice: 1690000,
    badge: 'hot',
    rating: 4.9,
    reviews: 214,
    categoryId: 'phones-tablets',
    image: img('photo-1695048133142-1a20484d2569'),
    seller: 'Kigali Tech Hub',
    stock: 12,
  },
  {
    id: 'deal-02',
    slug: 'samsung-galaxy-a55-5g-128gb',
    title: 'Samsung Galaxy A55 5G 128GB',
    specs: 'Exynos 1480 • 6.6" AMOLED • 5000mAh',
    price: 620000,
    originalPrice: 730000,
    badge: 'bestseller',
    rating: 4.7,
    reviews: 486,
    categoryId: 'phones-tablets',
    image: img('photo-1610945265064-0e34e5519bbf'),
    seller: 'Rwanda Mobile Store',
    stock: 34,
  },
  {
    id: 'deal-03',
    slug: 'hp-elitebook-840-g8-i7',
    title: 'HP EliteBook 840 G8 (i7, 16GB)',
    specs: 'Intel Core i7 • 16GB RAM • 512GB SSD',
    price: 1180000,
    originalPrice: 1380000,
    badge: 'popular',
    rating: 4.8,
    reviews: 132,
    categoryId: 'laptops-computers',
    image: img('photo-1496181133206-80ce9b88a853'),
    seller: 'East Africa Computers',
    stock: 7,
  },
  {
    id: 'deal-04',
    slug: 'samsung-55-qled-tv-4k',
    title: 'Samsung 55" QLED 4K Smart TV',
    specs: 'QLED • 4K • 60Hz • Netflix Built-in',
    price: 985000,
    originalPrice: 1150000,
    badge: 'hot',
    rating: 4.6,
    reviews: 97,
    categoryId: 'tvs-home-cinema',
    image: img('photo-1593359677879-a4bb92f829d1'),
    seller: 'Smart Living Rwanda',
    stock: 15,
  },
  {
    id: 'deal-05',
    slug: 'sony-playstation-5-slim',
    title: 'Sony PlayStation 5 Slim',
    specs: '1TB SSD • 4K 120fps • 1 Controller',
    price: 890000,
    originalPrice: 1020000,
    badge: 'bestseller',
    rating: 4.9,
    reviews: 341,
    categoryId: 'gaming',
    image: img('photo-1606144042614-b2417e99c4e3'),
    seller: 'Pixel Games Rwanda',
    stock: 21,
  },
]

/** "New Arrivals" strip below the deal grid. */
export const newArrivals = [
  {
    id: 'new-01',
    slug: 'apple-watch-series-9',
    title: 'Apple Watch Series 9 GPS 45mm',
    specs: 'Double tap • 2000 nits • SiP S9',
    price: 585000,
    originalPrice: 640000,
    badge: 'new',
    rating: 4.8,
    reviews: 143,
    categoryId: 'smartwatches-wearables',
    image: img('photo-1544117519-31a4b719223d'),
    seller: 'Kigali Tech Hub',
    stock: 28,
  },
  {
    id: 'new-02',
    slug: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Headphones',
    specs: 'ANC • 30h Battery • Multipoint',
    price: 465000,
    originalPrice: 540000,
    badge: 'new',
    rating: 4.9,
    reviews: 388,
    categoryId: 'audio-headphones',
    image: img('photo-1546435770-a3e426bf472b'),
    seller: 'Sound House Kigali',
    stock: 19,
  },
  {
    id: 'new-03',
    slug: 'dji-mavic-3-pro',
    title: 'DJI Mavic 3 Pro Fly More',
    specs: '5.1K • 43min Flight • RC Pro',
    price: 1650000,
    originalPrice: 1820000,
    badge: 'popular',
    rating: 4.9,
    reviews: 76,
    categoryId: 'cameras-drones',
    image: img('photo-1473968512647-3e447244af8f'),
    seller: 'Sky Rwanda Drones',
    stock: 5,
  },
  {
    id: 'new-04',
    slug: 'anker-prime-140w-charger',
    title: 'Anker Prime 140W GaN Charger',
    specs: '4 Ports • PPS • PowerIQ 4.0',
    price: 68000,
    originalPrice: 84000,
    badge: 'popular',
    rating: 4.7,
    reviews: 512,
    categoryId: 'accessories',
    image: img('photo-1583863788434-e58a36330cf0'),
    seller: 'Power Solutions RW',
    stock: 64,
  },
]
