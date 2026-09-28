import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Placeholder from './pages/Placeholder.jsx'

/** Suggestion chips reused by every placeholder route. */
const explore = [
  { label: '🔥 Best Deals', to: '/deals' },
  { label: '✨ New Arrivals', to: '/new-arrivals' },
  { label: 'Compare products', to: '/compare' },
  { label: 'Become a Promoter', to: '/promoter' },
]

/**
 * Static routes that are wired up but not built yet. Every nav link, card CTA
 * and footer link resolves to one of these instead of 404ing, so the routing
 * structure is in place for the rest of the marketplace.
 */
const staticPages = [
  ['deals', 'Deals', 'Weekly price drops across every category, refreshed every Monday.'],
  ['new-arrivals', 'New Arrivals', 'The latest hardware landing in Rwanda — added daily by verified suppliers.'],
  ['categories', 'All Categories', 'Eleven departments, thousands of products, one trusted marketplace.'],
  ['compare', 'Compare', 'Line up specifications, prices and warranty terms side by side.'],
  ['ai-assistant', 'AI Assistant', 'Describe what you need in plain language and get a shortlist back.'],
  ['promoter', 'Become a Promoter', 'Share products, earn commission on every confirmed order, get paid weekly.'],
  ['suppliers', 'For Suppliers', 'List your catalogue, reach 40,000+ shoppers and manage stock in one place.'],
  ['search', 'Search', 'Search across phones, laptops, TVs, audio, gaming and more.'],
  ['cart', 'Your Cart', 'Review items and check out with Mobile Money or card.'],
  ['support', 'Help Centre', 'Returns, warranty claims, delivery questions and more.'],
]

/** Routes with a path parameter. */
const paramRoutes = [
  ['/category/:id', 'Category', 'Browse everything in this department.'],
  ['/account/:tab', 'My Account', 'Orders, wishlist and saved payment methods.'],
  ['/about/:slug', 'ElectroLink Rwanda', 'Why shoppers and suppliers choose us.'],
]

/** Product detail is code-split so the homepage bundle stays lean. */
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'))

function Fallback() {
  return (
    <div className="page-shell py-20 text-center text-sm text-slate-400" role="status">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Fully built detail route (lazy-loaded) */}
            <Route path="/product/:slug" element={<ProductPage />} />

            {staticPages.map(([path, title, description]) => (
              <Route
                key={path}
                path={`/${path}`}
                element={<Placeholder title={title} description={description} suggestions={explore} />}
              />
            ))}

            {paramRoutes.map(([path, title, description]) => (
              <Route
                key={path}
                path={path}
                element={<Placeholder title={title} description={description} suggestions={explore} />}
              />
            ))}

            <Route
              path="*"
              element={
                <Placeholder
                  title="Page not found"
                  description="The page you're looking for doesn't exist or has moved."
                  suggestions={explore}
                />
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
