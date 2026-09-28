import ProductCard from './ProductCard.jsx'
import SectionHeader from './SectionHeader.jsx'

/**
 * Maps `ProductCard` over a product array.
 *
 * Breakpoints: 1 column on phones, 2 from `sm`, 3 from `lg`, and 5 from `xl`
 * — the 5-up layout the design calls for on desktop.
 */
export default function ProductGrid({
  products,
  title,
  icon,
  eyebrow,
  viewAllHref = '/deals',
  viewAllLabel = 'View All',
  columns = 'xl:grid-cols-5',
  className = '',
  showHeader = true,
}) {
  if (!products?.length) return null

  return (
    <section className={className}>
      {showHeader && (
        <SectionHeader
          title={title}
          icon={icon}
          eyebrow={eyebrow}
          viewAllHref={viewAllHref}
          viewAllLabel={viewAllLabel}
        />
      )}

      <div className={`grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 ${columns}`}>
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
