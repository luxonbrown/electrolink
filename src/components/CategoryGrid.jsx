import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getIcon } from '../lib/icons.js'
import { categoryTiles } from '../data/categories.js'
import SectionHeader from './SectionHeader.jsx'

/**
 * Horizontal strip of 10 category tiles: tinted rounded square holding a
 * coloured icon, with the label beneath.
 */
export default function CategoryGrid({ tiles = categoryTiles }) {
  return (
    <section aria-labelledby="shop-by-category">
      <SectionHeader
        title="Shop by Category"
        viewAllHref="/categories"
        viewAllLabel="View All"
        className="mb-4"
      />

      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-card sm:p-4">
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-10 lg:gap-2.5">
          {tiles.map((tile, i) => {
            const Icon = getIcon(tile.icon)
            return (
              <motion.li
                key={tile.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.035, ease: 'easeOut' }}
              >
                <Link
                  to={`/category/${tile.id}`}
                  className="group flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-slate-50"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl ${tile.tint} transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md sm:h-12 sm:w-12`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-[10.5px] leading-tight font-semibold text-slate-600 transition-colors group-hover:text-brand-700 sm:text-[11.5px]">
                    {tile.label}
                  </span>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
