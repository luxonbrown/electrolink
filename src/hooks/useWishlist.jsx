import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/**
 * Wishlist state lives here rather than inside `ProductCard` so the header cart
 * and the heart icons on different cards stay in sync, and so a heart survives
 * re-renders of the grid (e.g. filter changes or the carousel's autoplay tick).
 */
const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => new Set())

  const toggle = useCallback((id) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      ids,
      count: ids.size,
      has: (id) => ids.has(id),
      toggle,
    }),
    [ids, toggle],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside a <WishlistProvider>')
  return ctx
}
