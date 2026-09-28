import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users } from '../lib/icons.js'
import { badgeFor, commissionFor, discountFor, savingsFor } from '../data/products.js'
import { formatNumber } from '../lib/format.js'
import { useWishlist } from '../hooks/useWishlist.jsx'
import RatingStars from './RatingStars.jsx'

/**
 * Reusable deal card.
 *
 * All money figures are derived here from `product.price` / `product.originalPrice`
 * so the price row, the savings pill and the commission line can never contradict
 * each other. Wishlist state is shared app-wide via `useWishlist`.
 */
export default function ProductCard({ product, index = 0 }) {
  const { has, toggle } = useWishlist()
  const saved = has(product.id)
  const badge = badgeFor(product)
  const savings = savingsFor(product)
  const discount = discountFor(product)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, delay: Math.min(index, 4) * 0.06, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
    >
      {/* Badges */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 z-20 flex flex-col items-start gap-1.5">
        {badge && (
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase shadow-sm ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-slate-900/85 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => toggle(product.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        className="absolute top-2.5 right-2.5 z-20 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-400 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-rose-300 hover:text-rose-500"
      >
        <Heart
          className={`h-4.5 w-4.5 transition-colors ${saved ? 'fill-rose-500 text-rose-500' : ''}`}
        />
      </button>

      {/* Image */}
      <Link
        to={`/product/${product.slug}`}
        className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-white p-4"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={product.image}
          alt=""
          width={400}
          height={300}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col border-t border-slate-100 p-3.5">
        <RatingStars rating={product.rating} reviews={product.reviews} className="mb-1.5" />

        <h3 className="line-clamp-2 text-[13px] leading-snug font-bold text-navy-900">
          <Link
            to={`/product/${product.slug}`}
            className="transition-colors hover:text-brand-600"
          >
            {product.title}
          </Link>
        </h3>

        <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">{product.specs}</p>

        {/* Price row */}
        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[11px] font-medium text-slate-400 line-through tabular-nums">
            RWF {formatNumber(product.originalPrice)}
          </span>
          <span className="text-lg leading-none font-extrabold text-navy-900 tabular-nums">
            RWF {formatNumber(product.price)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
            Save RWF {formatNumber(savings)}
          </span>
          {typeof product.stock === 'number' && product.stock <= 10 && (
            <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Affiliate earn line */}
        <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          Earn RWF {formatNumber(commissionFor(product))}
        </p>

        {/* CTA pinned to the card bottom so rows align */}
        <div className="mt-auto pt-3">
          <Link
            to={`/product/${product.slug}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-xs font-bold text-white transition-all duration-200 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/30 active:scale-[0.98]"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
