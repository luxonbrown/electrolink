import { Star } from '../lib/icons.js'

/**
 * Compact 5-star rating with a numeric score and review count.
 * `size` accepts any Tailwind text size utility for the glyphs.
 */
export default function RatingStars({ rating, reviews, size = 'text-xs', className = '' }) {
  if (typeof rating !== 'number') return null
  const clamped = Math.min(5, Math.max(0, rating))

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-px" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${size} ${
              i <= Math.round(clamped) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        ))}
      </span>
      <span className="text-[11px] font-semibold text-slate-600">{clamped.toFixed(1)}</span>
      {typeof reviews === 'number' && (
        <span className="text-[11px] text-slate-400">({reviews})</span>
      )}
    </div>
  )
}
