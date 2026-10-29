// Тимчасові дані головної, поки немає підключення до Shopify Storefront API.
// Компоненти беруть їх лише через composables з useCatalog.ts. Типи — у shared/types/catalog.ts.
// Ціни круглі, без перекреслених «старих» цін і плашок: для люксу знижки й бейджі на головній не показуємо.
// Суми 95 і 110 тимчасові, справжні круглі ціни погодити з клієнткою і задати в Shopify.
import type { HomeCategory, ProductSummary } from '#shared/types/catalog'

export const homeCategories: HomeCategory[] = [
  { handle: 'totes', labelKey: 'category.totes', image: '/images/cat-totes.jpg' },
  { handle: 'shoulder-bags', labelKey: 'category.shoulderBags', image: '/images/cat-shoulder.jpg' },
  { handle: 'laptop-work', labelKey: 'category.laptopWork', image: '/images/cat-laptop.jpg' },
  { handle: 'mini-crossbody', labelKey: 'category.miniCrossbody', image: '/images/cat-mini.jpg' },
]

export const bestsellers: ProductSummary[] = [
  {
    handle: 'studded-laptop-tote',
    title: 'Studded Laptop Tote',
    subtitle: 'Crazy Horse leather, convertible strap',
    image: { url: '/images/studded-laptop-tote.jpg', alt: 'Studded leather laptop tote' },
    price: { amount: 102, currencyCode: 'USD' },
    compareAtPrice: null,
    colors: ['black', 'cognac', 'chocolate', 'burgundy', 'green'],
    imageColor: 'cognac',
    badge: null,
  },
  {
    handle: 'slouchy-hobo-bag',
    title: 'Slouchy Hobo Bag',
    subtitle: 'Oversized shoulder tote',
    image: { url: '/images/slouchy-hobo.jpg', alt: 'Slouchy cognac leather hobo bag' },
    price: { amount: 102, currencyCode: 'USD' },
    compareAtPrice: null,
    colors: ['cognac', 'black', 'tan', 'burgundy'],
    imageColor: 'cognac',
    badge: null,
  },
  {
    handle: 'mini-crossbody-tote',
    title: 'Mini Crossbody Tote',
    subtitle: 'Small everyday bag with zipper',
    image: { url: '/images/mini-crossbody.jpg', alt: 'Small cognac leather crossbody tote' },
    price: { amount: 95, currencyCode: 'USD' },
    compareAtPrice: null,
    colors: ['burgundy', 'red', 'black', 'cognac'],
    imageColor: 'cognac',
    badge: null,
  },
  {
    handle: 'large-cognac-zip-tote',
    title: 'Large Cognac Zip Tote',
    subtitle: 'Unique shape, side pocket',
    image: { url: '/images/large-zip-tote.jpg', alt: 'Large cognac leather tote with zipper' },
    price: { amount: 110, currencyCode: 'USD' },
    compareAtPrice: null,
    colors: ['caramel', 'black', 'chocolate'],
    imageColor: 'caramel',
    badge: null,
  },
]
