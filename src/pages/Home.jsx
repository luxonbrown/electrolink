import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel.jsx'
import CategoryGrid from '../components/CategoryGrid.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { PromoBannerRow } from '../components/PromoBanner.jsx'
import PromoterCard from '../components/PromoterCard.jsx'
import AIAssistantCard from '../components/AIAssistantCard.jsx'
import CompareCard from '../components/CompareCard.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import Sidebar from '../components/Sidebar.jsx'
import { useUI } from '../hooks/useUI.jsx'
import { bestDeals, newArrivals } from '../data/products.js'
import { Menu, Store } from '../lib/icons.js'

/**
 * Home: 3-column shell (sidebar | main | right rail) on `xl+`, a 2-column
 * layout on `lg`, and a single stack below that with the categories moved into
 * a drawer.
 */
export default function Home() {
  const { openCategories } = useUI()

  return (
    <div className="page-shell py-5">
      {/* Mobile / tablet: categories collapse into a drawer behind this button */}
      <button
        type="button"
        onClick={openCategories}
        className="mb-4 flex w-full items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700 xl:hidden"
      >
        <Menu className="h-4.5 w-4.5" aria-hidden="true" />
        All Categories
        <span className="ml-auto text-[11px] font-medium text-brand-100">11 categories</span>
      </button>

      <div className="flex items-start gap-5">
        {/* LEFT: category list — sticky on desktop */}
        <div className="hidden w-62 shrink-0 xl:sticky xl:top-20 xl:block">
          <Sidebar variant="column" />
        </div>

        {/* CENTER: main content */}
        <div className="min-w-0 flex-1 space-y-6">
          <HeroCarousel />

          <CategoryGrid />

          <ProductGrid
            products={bestDeals}
            title="Best Deals This Week"
            icon="🔥"
            eyebrow={`${bestDeals.length} hand-picked`}
            viewAllHref="/deals"
          />

          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            icon="✨"
            viewAllHref="/new-arrivals"
            columns="xl:grid-cols-4"
            className="pt-1"
          />

          <section aria-label="Shop by interest">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="section-title">More to Explore</h2>
              <Link
                to="/categories"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View All →
              </Link>
            </div>
            <PromoBannerRow />
          </section>

          <div className="lg:hidden">
            <Sidebar variant="column" />
          </div>
        </div>

        {/* RIGHT: widgets */}
        <aside className="hidden w-70 shrink-0 space-y-4 lg:block">
          <div className="xl:sticky xl:top-20 xl:space-y-4">
            <PromoterCard />
            <AIAssistantCard />
            <CompareCard />
            <WhyChooseUs />
          </div>
        </aside>
      </div>

      {/* Right rail re-flows below the main column on tablet */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
        <PromoterCard />
        <AIAssistantCard />
        <CompareCard />
        <WhyChooseUs />
      </div>

      {/* Trust strip — closes the page on mobile where the rail has moved down */}
      <section className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-4 text-[11.5px] font-semibold text-slate-500 shadow-card sm:gap-x-10">
        <span className="flex items-center gap-1.5">
          <Store className="h-4 w-4 text-brand-600" aria-hidden="true" />
          120+ verified shops
        </span>
        <span>•</span>
        <span>Over 24,000 products in stock</span>
        <span>•</span>
        <span>Same-day delivery in Kigali</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">12-month warranty support</span>
      </section>
    </div>
  )
}
