import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from '../lib/icons.js'
import { promoBanners } from '../data/promoBanners.js'

/** Gradient + text-colour pair for each promo tone. */
const TONES = {
  navy: {
    shell: 'from-navy-800 to-navy-950',
    veil: 'from-navy-900 via-navy-900/40 to-transparent',
    title: 'text-white',
    subtitle: 'text-slate-300',
    cta: 'bg-white text-navy-900 hover:bg-brand-50',
  },
  emerald: {
    shell: 'from-emerald-700 to-emerald-900',
    veil: 'from-emerald-800 via-emerald-800/40 to-transparent',
    title: 'text-white',
    subtitle: 'text-emerald-100',
    cta: 'bg-white text-emerald-800 hover:bg-emerald-50',
  },
  purple: {
    shell: 'from-purple-700 to-purple-950',
    veil: 'from-purple-800 via-purple-800/40 to-transparent',
    title: 'text-white',
    subtitle: 'text-purple-100',
    cta: 'bg-white text-purple-800 hover:bg-purple-50',
  },
}

/**
 * One promo card. Artwork is decorative: it sits on the right at low opacity on
 * `sm+` and is masked by a veil on mobile so the headline keeps its contrast.
 */
export default function PromoBanner({ banner, index = 0 }) {
  const tone = TONES[banner.tone] ?? TONES.navy

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${tone.shell} p-5 shadow-md transition-shadow duration-300 hover:shadow-xl`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={banner.image}
          alt=""
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          className="absolute inset-y-0 right-0 h-full w-2/5 object-cover opacity-80 sm:w-1/2"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${tone.veil}`} />
      </div>

      <div className="relative max-w-[64%] sm:max-w-[60%]">
        <h3 className={`text-base leading-tight font-extrabold sm:text-lg ${tone.title}`}>
          {banner.title}
        </h3>
        <p className={`mt-1 text-[11px] font-medium sm:text-xs ${tone.subtitle}`}>
          {banner.subtitle}
        </p>

        <Link
          to={banner.href}
          className={`group mt-3.5 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] sm:text-[13px] ${tone.cta}`}
        >
          {banner.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}

/** Row of promo banners. */
export function PromoBannerRow({ banners = promoBanners }) {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {banners.map((banner, i) => (
        <PromoBanner key={banner.id} banner={banner} index={i} />
      ))}
    </div>
  )
}
