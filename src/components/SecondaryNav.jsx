import { NavLink } from 'react-router-dom'
import { ShieldCheck, Truck } from '../lib/icons.js'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Deals', to: '/deals' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Compare', to: '/compare' },
  { label: 'AI Assistant', to: '/ai-assistant' },
  { label: 'Become a Promoter', to: '/promoter' },
  { label: 'For Suppliers', to: '/suppliers' },
]

const trustBadges = [
  { icon: ShieldCheck, label: '100% Secure Payments', tint: 'text-emerald-600' },
  { icon: Truck, label: 'Fast Delivery in Rwanda', tint: 'text-brand-600' },
]

export default function SecondaryNav() {
  return (
    <div className="border-b border-slate-200 bg-white shadow-sm">
      <div className="page-shell">
        <div className="flex h-12 items-center justify-between gap-4">
          {/* Horizontal nav — horizontally scrollable on narrow screens */}
          <nav aria-label="Main" className="-mx-1 min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex items-center gap-0.5 px-1">
              {navLinks.map((link) => (
                <li key={link.to} className="shrink-0">
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `relative block rounded-md px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-brand-600 after:absolute after:inset-x-2.5 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Trust badges — hidden below lg where horizontal space is tight */}
          <ul className="hidden shrink-0 items-center gap-4 lg:flex">
            {trustBadges.map(({ icon: Icon, label, tint }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className={`h-4 w-4 ${tint}`} aria-hidden="true" />
                <span className="text-[11px] font-semibold whitespace-nowrap text-slate-600">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
