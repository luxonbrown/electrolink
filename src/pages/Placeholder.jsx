import { Link } from 'react-router-dom'
import { ArrowRight, Construction } from '../lib/icons.js'

/**
 * Placeholder for routes that are wired up but not yet built. Keeps every nav
 * link, card CTA and footer link from 404ing.
 */
export default function Placeholder({ title, description, suggestions = [] }) {
  return (
    <div className="page-shell py-16">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <Construction className="h-7 w-7" aria-hidden="true" />
        </span>

        <h1 className="mt-4 text-2xl font-extrabold text-navy-900">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

        {suggestions.length > 0 && (
          <>
            <p className="mt-6 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Meanwhile, try these
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {suggestions.map((item) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-sm"
                >
                  {item.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </>
        )}

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg active:scale-[0.98]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
