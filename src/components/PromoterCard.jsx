import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, TrendingUp, User, Users, Wallet } from '../lib/icons.js'

/** Three-up stat strip under the promoter pitch. */
const stats = [
  { icon: Users, value: '1,240+', label: 'Active Promoters' },
  { icon: Wallet, value: 'RWF 5M+', label: 'Total Earned' },
  { icon: User, value: 'Free', label: "Join Now — It's Free" },
]

export default function PromoterCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="overflow-hidden rounded-xl border border-brand-100 bg-gradient-to-br from-brand-50 to-brand-100/70 shadow-card"
    >
      <div className="flex items-start gap-3 p-4 pb-3">
        <div className="relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80"
            alt=""
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-white"
          />
          <span className="absolute -right-0.5 -bottom-0.5 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 ring-2 ring-white">
            <Sparkles className="h-3 w-3 text-white" />
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="text-[15px] leading-tight font-extrabold text-navy-900">
            Become a Promoter
          </h2>
          <p className="mt-1 text-[11.5px] leading-snug text-slate-600">
            Share products, get clicks, earn commissions!
          </p>
        </div>
      </div>

      <div className="px-4 pb-3.5">
        <Link
          to="/promoter"
          className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98]"
        >
          Start Earning
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-brand-200/70 border-t border-brand-200/70 bg-white/60">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="px-2 py-3 text-center">
            <Icon className="mx-auto h-4 w-4 text-brand-600" aria-hidden="true" />
            <dt className="mt-1 text-[11.5px] font-extrabold text-navy-900 tabular-nums">
              {value}
            </dt>
            <dd className="mt-0.5 text-[9.5px] leading-tight text-slate-500">{label}</dd>
          </div>
        ))}
      </dl>

      <p className="flex items-center justify-center gap-1 border-t border-brand-200/70 px-3 py-2 text-[10px] font-semibold text-emerald-700">
        <TrendingUp className="h-3 w-3" aria-hidden="true" />
        Payouts every Friday via Mobile Money
      </p>
    </motion.aside>
  )
}
