import { Link } from 'react-router-dom'
import { Zap } from '../lib/icons.js'

/**
 * Two-tone ElectroLink wordmark: bolt-in-circle mark, "ElectroLink" on top and
 * a smaller "RWANDA" subtitle underneath. `tone` switches the subtitle colour
 * so the same mark works on the navy header and on a white footer.
 */
export default function Logo({ tone = 'dark', to = '/', className = '' }) {
  const subtitle = tone === 'dark' ? 'text-brand-400' : 'text-brand-600'
  const wordmark = tone === 'dark' ? 'text-white' : 'text-navy-900'

  return (
    <Link
      to={to}
      aria-label="ElectroLink Rwanda — home"
      className={`group flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 transition-transform duration-300 group-hover:scale-105 group-hover:bg-brand-500">
        <Zap className="h-5 w-5 fill-white text-white" strokeWidth={2.2} aria-hidden="true" />
        <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-navy-900 bg-emerald-400" />
      </span>

      <span className="flex flex-col leading-none">
        <span className={`text-[17px] font-extrabold tracking-tight ${wordmark}`}>ElectroLink</span>
        <span className={`mt-0.5 text-[10px] font-semibold tracking-[0.22em] uppercase ${subtitle}`}>
          Rwanda
        </span>
      </span>
    </Link>
  )
}
