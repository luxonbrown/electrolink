import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import Header from './Header.jsx'
import SecondaryNav from './SecondaryNav.jsx'
import Sidebar from './Sidebar.jsx'
import { WishlistProvider } from '../hooks/useWishlist.jsx'
import { UIProvider, useUI } from '../hooks/useUI.jsx'
import { Mail, MapPin, Phone, Share2 } from '../lib/icons.js'

const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Phones & Tablets', to: '/category/phones-tablets' },
      { label: 'Laptops', to: '/category/laptops-computers' },
      { label: 'TVs & Home Cinema', to: '/category/tvs-home-cinema' },
      { label: 'Audio', to: '/category/audio-headphones' },
      { label: 'Gaming', to: '/category/gaming' },
    ],
  },
  {
    title: 'Partner',
    links: [
      { label: 'Become a Promoter', to: '/promoter' },
      { label: 'For Suppliers', to: '/suppliers' },
      { label: 'Affiliate Programme', to: '/promoter' },
      { label: 'Advertise', to: '/suppliers' },
      { label: 'Bulk Orders', to: '/suppliers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre', to: '/support' },
      { label: 'Returns & Refunds', to: '/support' },
      { label: 'Track Order', to: '/account/orders' },
      { label: 'Warranty', to: '/support' },
      { label: 'Contact Us', to: '/support' },
    ],
  },
]

const PAYMENTS = ['MTN MoMo', 'Airtel Money', 'Visa', 'Mastercard']

/** Wires the category drawer to the UI context; keeps `Layout` readable. */
function CategoryDrawer() {
  const { categoriesOpen, closeCategories } = useUI()
  return <Sidebar variant="drawer" open={categoriesOpen} onClose={closeCategories} />
}

/**
 * App shell: sticky header, secondary nav, routed page, footer.
 *
 * `WishlistProvider` wraps everything so the header's wishlist count and the
 * hearts inside `ProductCard` share one source of truth; `UIProvider` owns the
 * mobile category drawer shared by the header and the main column.
 */
export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    // Keying the provider on the pathname resets drawer state on navigation,
    // which avoids a setState-in-effect just to close an open drawer.
    <UIProvider key={pathname}>
      <WishlistProvider>
        <div className="flex min-h-dvh flex-col bg-slate-50">
          <Header />
          <SecondaryNav />
          <CategoryDrawer />

          <main className="flex-1">{children}</main>

          <footer className="mt-10 bg-navy-900 text-slate-300">
            <div className="page-shell py-10">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <Logo />
                  <p className="mt-3.5 max-w-sm text-[12.5px] leading-relaxed text-slate-400">
                    Rwanda&apos;s trusted electronics marketplace. Shop phones, laptops, TVs and
                    accessories from verified local suppliers — and earn commission every time you
                    share what you love.
                  </p>

                  <ul className="mt-4 space-y-2 text-[12px]">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                      KG 12 Ave, Kacyiru, Kigali, Rwanda
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                      +250 788 000 000
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                      hello@electrolink.rw
                    </li>
                  </ul>
                </div>

                {FOOTER_COLUMNS.map((column) => (
                  <nav key={column.title} aria-label={column.title}>
                    <h2 className="text-[13px] font-bold text-white">{column.title}</h2>
                    <ul className="mt-3 space-y-2">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.to}
                            className="text-[12.5px] text-slate-400 transition-colors hover:text-brand-400"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11.5px] text-slate-500">
                  © {new Date().getFullYear()} ElectroLink Rwanda. All prices in RWF.
                </p>

                <ul className="flex flex-wrap items-center gap-2">
                  {PAYMENTS.map((method) => (
                    <li
                      key={method}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold text-slate-300"
                    >
                      {method}
                    </li>
                  ))}
                  <li className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold text-slate-300">
                    <Share2 className="h-3 w-3" aria-hidden="true" />
                    Follow us
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </WishlistProvider>
    </UIProvider>
  )
}
