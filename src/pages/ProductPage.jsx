import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
} from '../lib/icons.js'
import { bestDeals, newArrivals, commissionFor, savingsFor } from '../data/products.js'
import { formatNumber } from '../lib/format.js'
import { useWishlist } from '../hooks/useWishlist.jsx'
import ProductCard from '../components/ProductCard.jsx'
import RatingStars from '../components/RatingStars.jsx'
import SectionHeader from '../components/SectionHeader.jsx'

const catalogue = [...bestDeals, ...newArrivals]

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: '12-month official warranty' },
  { icon: Truck, label: 'Free delivery in Kigali over RWF 50,000' },
  { icon: Store, label: 'Sold by a verified local supplier' },
]

/**
 * Product detail. Code-split out of the homepage bundle via a lazy route in
 * `App.jsx`. The product is looked up from the mock catalogue by slug.
 */
export default function ProductPage() {
  const { slug } = useParams()
  const product = catalogue.find((p) => p.slug === slug)
  const { has, toggle } = useWishlist()

  if (!product) {
    return (
      <div className="page-shell py-16 text-center">
        <h1 className="text-2xl font-extrabold text-navy-900">Product not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          We couldn&apos;t find a product with the reference <code>{slug}</code>.
        </p>
        <Link
          to="/deals"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
        >
          Browse Deals
        </Link>
      </div>
    )
  }

  const saved = has(product.id)
  const related = catalogue.filter((p) => p.id !== product.id).slice(0, 5)

  return (
    <div className="page-shell py-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-slate-500">
        <Link to="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="px-1.5">/</span>
        <Link to="/deals" className="hover:text-brand-600">
          Deals
        </Link>
        <span className="px-1.5">/</span>
        <span className="font-semibold text-navy-900">{product.title}</span>
      </nav>

      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-card lg:grid-cols-2 lg:gap-10">
        {/* Gallery placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-8"
        >
          <img
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="h-full w-full object-contain"
          />
        </motion.div>

        {/* Buy box */}
        <div>
          <p className="text-[11px] font-bold tracking-widest text-brand-600 uppercase">
            {product.seller}
          </p>
          <h1 className="mt-1.5 text-2xl leading-tight font-extrabold text-navy-900 lg:text-3xl">
            {product.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">{product.specs}</p>

          <RatingStars rating={product.rating} reviews={product.reviews} size="text-sm" className="mt-3" />

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold text-navy-900 tabular-nums">
                RWF {formatNumber(product.price)}
              </span>
              <span className="text-sm font-medium text-slate-400 line-through tabular-nums">
                RWF {formatNumber(product.originalPrice)}
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                Save RWF {formatNumber(savingsFor(product))}
              </span>
            </div>
            <p className="mt-2.5 text-[12.5px] font-semibold text-brand-600">
              Promoters earn RWF {formatNumber(commissionFor(product))} on every confirmed order
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[12.5px] text-slate-600">
                <Icon className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg active:scale-[0.98]"
            >
              <ShoppingCart className="h-4.5 w-4.5" aria-hidden="true" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              aria-pressed={saved}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-[0.98]"
            >
              <Heart className={`h-4.5 w-4.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <SectionHeader
          title="You May Also Like"
          icon="🛍️"
          viewAllHref="/deals"
          viewAllLabel="View All"
        />
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          to="/deals"
          className="group inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-lg"
        >
          Back to all deals
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
