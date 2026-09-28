/**
 * Category taxonomy.
 * `icon` is a lucide-react component name string — resolved centrally in
 * `src/lib/icons.js` so this file stays free of JSX and is safe to import
 * anywhere (including plain JS contexts).
 */
export const categoryTree = [
  {
    id: 'phones-tablets',
    label: 'Phones & Tablets',
    icon: 'Smartphone',
    tint: 'bg-blue-50 text-blue-600',
    children: ['Smartphones', 'Feature Phones', 'Tablets', 'Phones Accessories'],
  },
  {
    id: 'laptops-computers',
    label: 'Laptops & Computers',
    icon: 'Laptop',
    tint: 'bg-indigo-50 text-indigo-600',
    children: ['Laptops', 'Desktops', 'Monitors', 'PC Components'],
  },
  {
    id: 'tvs-home-cinema',
    label: 'TVs & Home Cinema',
    icon: 'Tv',
    tint: 'bg-violet-50 text-violet-600',
    children: ['Smart TVs', 'TV Accessories', 'Soundbars', 'Projectors'],
  },
  {
    id: 'audio-headphones',
    label: 'Audio & Headphones',
    icon: 'Headphones',
    tint: 'bg-emerald-50 text-emerald-600',
    children: ['Headphones', 'Earbuds', 'Bluetooth Speakers', 'Home Theatre'],
  },
  {
    id: 'smartwatches-wearables',
    label: 'Smartwatches & Wearables',
    icon: 'Watch',
    tint: 'bg-rose-50 text-rose-600',
    children: ['Smartwatches', 'Fitness Bands', 'Smart Glasses', 'Wearable Rings'],
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: 'Gamepad2',
    tint: 'bg-orange-50 text-orange-600',
    children: ['Consoles', 'Gaming Laptops', 'Controllers', 'Gaming Headsets'],
  },
  {
    id: 'cameras-drones',
    label: 'Cameras & Drones',
    icon: 'Camera',
    tint: 'bg-cyan-50 text-cyan-600',
    children: ['DSLR & Mirrorless', 'Action Cams', 'Drones', 'Camera Lenses'],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    icon: 'Cable',
    tint: 'bg-teal-50 text-teal-600',
    children: ['Chargers & Power', 'Cables & Adapters', 'Cases & Covers', 'Screen Protectors'],
  },
  {
    id: 'networking',
    label: 'Networking',
    icon: 'Router',
    tint: 'bg-amber-50 text-amber-600',
    children: ['Routers', 'Wi-Fi Extenders', 'Switches', 'Modems'],
  },
  {
    id: 'smart-home',
    label: 'Smart Home',
    icon: 'House',
    tint: 'bg-lime-50 text-lime-600',
    children: ['Smart Lighting', 'Smart Locks', 'Security Cameras', 'Voice Assistants'],
  },
  {
    id: 'printers-scanners',
    label: 'Printers & Scanners',
    icon: 'Printer',
    tint: 'bg-slate-100 text-slate-600',
    children: ['Inkjet Printers', 'Laser Printers', 'Scanners', 'Printer Ink'],
  },
]

/** The 10 tiles shown in the "Shop by Category" strip. */
export const categoryTiles = [
  { id: 'phones-tablets', label: 'Phones', icon: 'Smartphone', tint: 'bg-blue-50 text-blue-600' },
  { id: 'laptops-computers', label: 'Laptops', icon: 'Laptop', tint: 'bg-indigo-50 text-indigo-600' },
  { id: 'tvs-home-cinema', label: 'TVs', icon: 'Tv', tint: 'bg-violet-50 text-violet-600' },
  { id: 'audio-headphones', label: 'Audio', icon: 'Headphones', tint: 'bg-emerald-50 text-emerald-600' },
  {
    id: 'smartwatches-wearables',
    label: 'Smartwatches',
    icon: 'Watch',
    tint: 'bg-rose-50 text-rose-600',
  },
  { id: 'gaming', label: 'Gaming', icon: 'Gamepad2', tint: 'bg-orange-50 text-orange-600' },
  { id: 'cameras-drones', label: 'Cameras', icon: 'Camera', tint: 'bg-cyan-50 text-cyan-600' },
  { id: 'accessories', label: 'Accessories', icon: 'Cable', tint: 'bg-teal-50 text-teal-600' },
  { id: 'networking', label: 'Networking', icon: 'Router', tint: 'bg-amber-50 text-amber-600' },
  { id: 'smart-home', label: 'Smart Home', icon: 'House', tint: 'bg-lime-50 text-lime-600' },
]
