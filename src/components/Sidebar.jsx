import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Menu, X } from '../lib/icons.js'
import { categoryTree } from '../data/categories.js'
import { getIcon } from '../lib/icons.js'

/**
 * Category list. Rendered in two places:
 *  - the sticky left column on `xl+` screens
 *  - inside a slide-out drawer below that, opened by the header hamburger or
 *    by the "All Categories" button in the main column.
 */
export default function Sidebar({ variant = 'column', open = false, onClose }) {
  const [activeId, setActiveId] = useState(null)
  const isDrawer = variant === 'drawer'

  const list = (
    <nav aria-label="Product categories" className="space-y-0.5">
      {categoryTree.map((category) => {
        const Icon = getIcon(category.icon)
        const isOpen = activeId === category.id

        return (
          <div key={category.id} className="group relative">
            <Link
              to={`/category/${category.id}`}
              onMouseEnter={() => setActiveId(category.id)}
              onFocus={() => setActiveId(category.id)}
              onClick={() => onClose?.()}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                isOpen
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-700 hover:bg-brand-50 hover:text-navy-900'
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0 text-slate-500 transition-colors group-hover:text-brand-600" />
              <span className="min-w-0 flex-1 truncate">{category.label}</span>
              <ChevronRight
                className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'translate-x-0.5 text-brand-600' : 'group-hover:translate-x-0.5'
                }`}
              />
            </Link>

            {/* Flyout submenu — hover/focus reveals it on desktop; in the
                drawer it expands inline so it needs no pointer tricks. */}
            <div
              className={
                isDrawer
                  ? `grid overflow-hidden transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`
                  : 'pointer-events-none absolute top-0 left-full z-40 pl-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100'
              }
            >
              <div className="min-h-0">
                <ul
                  className={`space-y-0.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${
                    isDrawer ? 'mt-0.5 ml-3' : 'w-56'
                  }`}
                >
                  {category.children.map((child) => (
                    <li key={child}>
                      <Link
                        to={`/category/${category.id}?sub=${encodeURIComponent(child)}`}
                        onClick={() => onClose?.()}
                        className="block rounded-lg px-2.5 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        {child}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )

  if (isDrawer) {
    return (
      <>
        {/* Scrim */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close categories"
          className={`fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
            open ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        <aside
          aria-label="Categories drawer"
          className={`fixed inset-y-0 left-0 z-60 flex w-[86%] max-w-sm flex-col bg-white transition-transform duration-300 xl:hidden ${
            open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5">
            <span className="text-sm font-bold text-navy-900">All Categories</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close categories"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">{list}</div>

          <div className="border-t border-slate-200 p-3">
            <Link
              to="/suppliers"
              onClick={() => onClose?.()}
              className="block rounded-lg bg-navy-900 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Browse All Categories
            </Link>
          </div>
        </aside>
      </>
    )
  }

  return (
    <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center gap-2 bg-brand-600 px-3.5 py-3 text-white">
        <Menu className="h-4.5 w-4.5" aria-hidden="true" />
        <h2 className="text-sm font-bold">All Categories</h2>
      </div>
      <div className="p-2">{list}</div>
    </aside>
  )
}
