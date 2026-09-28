import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, BadgeCheck, Lock, Truck } from '../lib/icons.js'

/** 2x2 trust grid. */
const reasons = [
  { icon: BadgeCheck, label: 'Verified Suppliers', tint: 'bg-emerald-50 text-emerald-600' },
  { icon: Lock, label: 'Secure Payments', tint: 'bg-brand-50 text-brand-600' },
  { icon: Award, label: 'Warranty Support', tint: 'bg-amber-50 text-amber-600' },
  { icon: Truck, label: 'Rwanda Delivery', tint: 'bg-purple-50 text-purple-600' },
]

export default function WhyChooseUs() {
  return (
    <motion.section
      aria-labelledby="why-choose-us"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-card"
    >
      <h2 id="why-choose-us" className="text-[15px] font-extrabold text-navy-900">
        Why Choose <span className="text-brand-600">ElectroLink?</span>
      </h2>

      <ul className="mt-3 grid grid-cols-2 gap-2.5">
        {reasons.map(({ icon: Icon, label, tint }) => (
          <li key={label}>
            <Link
              to="/about/why-electrolink"
              className="group flex flex-col items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50/60 p-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/60 hover:shadow-sm"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${tint}`}>
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="text-[10.5px] leading-tight font-semibold text-slate-600 transition-colors group-hover:text-navy-900">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
