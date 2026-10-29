// Усі меню сайту в одному місці. Шляхи без префікса мови (додає localePath), key — ключ i18n підпису.
// Статична конфігурація, як brand.ts: компоненти імпортують напряму.
import type { NavItem } from '~/types/navigation'

// Шапка на десктопі й бокове меню на мобільному
export const mainNav: NavItem[] = [
  { to: '/collections/all', key: 'nav.shop' },
  { to: '/collections/totes', key: 'nav.totes' },
  { to: '/#personal', key: 'nav.personalization' },
  { to: '/about', key: 'nav.story' },
]

// Футер, колонка «Shop»
export const footerShopNav: NavItem[] = [
  { to: '/collections/totes', key: 'nav.totes' },
  { to: '/collections/shoulder-bags', key: 'nav.shoulderBags' },
  { to: '/collections/backpacks', key: 'nav.backpacks' },
  { to: '/collections/belts-wallets', key: 'footer.beltsWallets' },
]

// Футер, колонка «Help»
export const footerHelpNav: NavItem[] = [
  { to: '/shipping', key: 'footer.shipping' },
  { to: '/returns', key: 'footer.returns' },
  { to: '/leather-care', key: 'footer.care' },
  { to: '/contact', key: 'footer.contact' },
]
