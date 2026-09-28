/**
 * RWF currency helpers.
 *
 * Rwandan Franc is not a decimal currency in practice — prices are quoted in
 * whole francs. `formatRWF` therefore rounds to the nearest franc and uses
 * thousands separators rather than decimal places.
 */

const rwfFormatter = new Intl.NumberFormat('en-RW', {
  maximumFractionDigits: 0,
})

/** `1250000` -> `"RWF 1,250,000"` */
export function formatRWF(amount) {
  return `RWF ${rwfFormatter.format(Math.round(amount))}`
}

/** `1250000` -> `"1,250,000"` — for use when the "RWF" label is already nearby. */
export function formatNumber(amount) {
  return rwfFormatter.format(Math.round(amount))
}

/** `19` -> `"19%"`, `7` -> `"7%"`. Falls back gracefully for 0. */
export function formatPercent(value) {
  const rounded = Math.round(value)
  if (!Number.isFinite(rounded) || rounded === 0) return null
  return `${rounded}%`
}
