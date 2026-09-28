import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Drawer state that has to be reachable from two unrelated places: the header
 * hamburger and the "All Categories" button inside the main column. Keeping it
 * in a context avoids prop-drilling the drawer through `Layout` and every page.
 *
 * `Layout` mounts this provider with `key={pathname}`, so navigating away
 * remounts it and resets `categoriesOpen` without a setState-in-effect.
 */
const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const openCategories = useCallback(() => setCategoriesOpen(true), [])
  const closeCategories = useCallback(() => setCategoriesOpen(false), [])

  // Lock background scroll while the drawer covers the page.
  useEffect(() => {
    document.body.style.overflow = categoriesOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [categoriesOpen])

  const value = useMemo(
    () => ({ categoriesOpen, openCategories, closeCategories }),
    [categoriesOpen, openCategories, closeCategories],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside a <UIProvider>')
  return ctx
}
