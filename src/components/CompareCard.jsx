import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, GitCompare } from '../lib/icons.js'

/** Dark navy "Compare & Choose" pitch with a device image. */
export default function CompareCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 p-4 shadow-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl"
      />

      <img
        src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=560&q=80"
        alt=""
        width={560}
        height={320}
        loading="lazy"
        decoding="async"
        className="relative mb-3 h-28 w-full rounded-lg object-cover opacity-80 ring-1 ring-white/10"
      />

      <div className="relative">
        <h2 className="flex items-center gap-1.5 text-[15px] font-extrabold text-white">
          <GitCompare className="h-4 w-4 text-brand-400" aria-hidden="true" />
          Compare &amp; Choose
        </h2>
        <p className="mt-1.5 text-[11.5px] leading-snug text-slate-300">
          Side by side. Make the right decision.
        </p>

        <Link
          to="/compare"
          className="group mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[13px] font-bold text-navy-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50 hover:shadow-lg active:scale-[0.98]"
        >
          Compare Products
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.aside>
  )
}
