import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import {
  Bell,
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from '../lib/icons.js'
import { useWishlist } from '../hooks/useWishlist.jsx'
import { useUI } from '../hooks/useUI.jsx'

/** Tagline dots sit between the logo and the search field on wide screens. */
const TAGLINES = ['Latest Electronics', 'Trusted Shops', 'Earn Together']

const LOCATIONS = ['Kigali', 'Huye', 'Musanze', 'Rubavu', 'Arua']

const ACCOUNT_LINKS = [
  { label: 'My Orders', href: '/account/orders' },
  { label: 'Wishlist', href: '/account/wishlist' },
  { label: 'Become a Promoter', href: '/promoter' },
  { label: 'Sign Out', href: '/' },
]

/** Small dropdown used by both the location and account menus. */
function Dropdown({ open, children, align = 'right' }) {
  if (!open) return null
  return (
    <div
      className={`absolute top-[calc(100%+8px)] z-50 min-w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
    >
      {children}
    </div>
  )
}

/** Pill-shaped count badge used by the notification and cart buttons. */
function CountBadge({ count, className = '' }) {
  if (!count) return null
  return (
    <span
      className={`absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold text-white ring-2 ring-navy-900 ${className}`}
    >
      {count}
    </span>
  )
}

export default function Header({ cartCount = 2, notifications = 3 }) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Kigali')
  const [openMenu, setOpenMenu] = useState(null) // 'location' | 'account' | null
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const navRef = useRef(null)
  const { count: wishlistCount } = useWishlist()
  const { openCategories } = useUI()

  // Close any open dropdown on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return undefined

    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openMenu])

  // Lock body scroll while the mobile nav sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  const handleSubmit = (e) => {
    // No backend: keep the typed query in the URL so the behaviour is honest.
    e.preventDefault()
    const q = query.trim()
    window.location.href = q ? `/search?q=${encodeURIComponent(q)}` : '/search'
  }

  const searchField = (
    <>
      <Search className="pointer-events-none absolute left-3.5 h-4.5 w-4.5 shrink-0 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={handleSubmit}
        placeholder="Search for phones, laptops, TVs, accessories..."
        aria-label="Search products"
        className="h-full w-full rounded-l-full bg-transparent pr-2 pl-11 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        className="flex h-full shrink-0 items-center gap-1.5 rounded-r-full bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 sm:px-5"
      >
        <Search className="h-4 w-4 sm:hidden" aria-hidden="true" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </>
  )

  return (
    <header className="sticky top-0 z-50 bg-navy-900 text-white shadow-lg shadow-navy-950/25">
      <div className="page-shell">
        <div className="flex h-16 items-center gap-4 lg:h-20 lg:gap-6">
          {/* Mobile: hamburger + search icon */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            className="-ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white/90 transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5.5 w-5.5" />
          </button>

          <Logo />

          {/* Tagline strip — desktop only, tucks in beside the search field */}
          <ul className="hidden shrink-0 items-center gap-2 text-[11px] whitespace-nowrap text-slate-400 xl:flex">
            {TAGLINES.map((tagline, i) => (
              <li key={tagline} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-600" />}
                <span className="transition-colors hover:text-slate-200">{tagline}</span>
              </li>
            ))}
          </ul>

          {/* Search — grows to fill available space */}
          <form
            onSubmit={handleSubmit}
            role="search"
            className="hidden h-11 min-w-0 flex-1 items-center rounded-full bg-white lg:flex"
          >
            {searchField}
          </form>

          <div ref={navRef} className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((v) => !v)}
              aria-label="Toggle search"
              aria-expanded={mobileSearchOpen}
              className="grid h-9 w-9 place-items-center rounded-lg text-white/90 transition-colors hover:bg-white/10 lg:hidden"
            >
              {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            {/* Location selector */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setOpenMenu((v) => (v === 'location' ? null : 'location'))}
                aria-expanded={openMenu === 'location'}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                <MapPin className="h-4.5 w-4.5 text-brand-400" />
                <span className="max-w-24 truncate">{location}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${openMenu === 'location' ? 'rotate-180' : ''}`} />
              </button>

              <Dropdown open={openMenu === 'location'}>
                <p className="px-3.5 pt-1 pb-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Deliver to
                </p>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setLocation(loc)
                      setOpenMenu(null)
                    }}
                    className={`flex w-full items-center gap-2 px-3.5 py-2 text-left text-sm transition-colors hover:bg-brand-50 ${
                      loc === location ? 'bg-brand-50 font-semibold text-brand-700' : 'text-slate-700'
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {loc}
                  </button>
                ))}
              </Dropdown>
            </div>

            {/* Notifications */}
            <button
              type="button"
              aria-label={`Notifications, ${notifications} unread`}
              className="relative hidden h-10 w-10 place-items-center rounded-lg text-white/90 transition-colors hover:bg-white/10 sm:grid"
            >
              <Bell className="h-5 w-5" />
              <CountBadge count={notifications} className="bg-red-600" />
            </button>

            {/* Account */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setOpenMenu((v) => (v === 'account' ? null : 'account'))}
                aria-expanded={openMenu === 'account'}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                <User className="h-4.5 w-4.5" />
                <span className="hidden lg:inline">My Account</span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${openMenu === 'account' ? 'rotate-180' : ''}`} />
              </button>

              <Dropdown open={openMenu === 'account'}>
                <div className="border-b border-slate-100 px-3.5 pt-1 pb-2.5">
                  <p className="text-sm font-semibold text-navy-900">Aline Umutoni</p>
                  <p className="text-xs text-slate-500">aline@example.rw</p>
                </div>
                {ACCOUNT_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpenMenu(null)}
                    className="flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    {link.label}
                    {link.label === 'Wishlist' && wishlistCount > 0 && (
                      <span className="rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                ))}
              </Dropdown>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative grid h-10 w-10 place-items-center rounded-lg text-white/90 transition-colors hover:bg-white/10"
            >
              <ShoppingCart className="h-5 w-5" />
              <CountBadge count={cartCount} className="bg-brand-600" />
            </Link>
          </div>
        </div>

        {/* Mobile search sheet */}
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${
            mobileSearchOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0">
            <form onSubmit={handleSubmit} role="search" className="flex h-11 items-center rounded-full bg-white">
              {searchField}
            </form>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`fixed inset-0 z-60 lg:hidden ${mobileNavOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileNavOpen}
      >
        <button
          type="button"
          tabIndex={mobileNavOpen ? 0 : -1}
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close menu"
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-navy-900 transition-transform duration-300 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="border-b border-white/10 px-4 py-3.5">
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false)
                openCategories()
              }}
              className="flex w-full items-center gap-2.5 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Menu className="h-4 w-4" />
              All Categories
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {ACCOUNT_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-white/10" />
            {LOCATIONS.slice(0, 3).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => {
                  setLocation(loc)
                  setMobileNavOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-white/85 transition-colors hover:bg-white/10"
              >
                <MapPin className="h-4 w-4 text-brand-400" />
                Deliver to {loc}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
