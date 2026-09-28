import { Link } from 'react-router-dom'
import { ArrowRight } from '../lib/icons.js'

/**
 * Shared section header: optional emoji/badge on the left, "View All →" on the
 * right. The action link is optional so a section can be a plain heading.
 */
export default function SectionHeader({ title, icon, eyebrow, viewAllHref = '/deals', viewAllLabel = 'View All', className = '' }) {
  return (
    <div className={`mb-4 flex items-end justify-between gap-3 ${className}`}>
      <div className="flex min-w-0 items-center gap-2">
        {icon && <span className="text-xl leading-none sm:text-2xl">{icon}</span>}
        <h2 className="section-title truncate">{title}</h2>
        {eyebrow && (
          <span className="hidden shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 sm:inline">
            {eyebrow}
          </span>
        )}
      </div>

      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="group inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
        >
          {viewAllLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
