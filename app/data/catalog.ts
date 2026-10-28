// Тимчасові дані головної, поки немає підключення до Shopify Storefront API.
// Форма ProductCard близька до того, що віддасть GraphQL-запит, щоб потім лише замінити джерело.

export type LeatherColor =
  | 'black'
  | 'cognac'
  | 'chocolate'
  | 'burgundy'
  | 'green'
  | 'tan'
  | 'red'
  | 'caramel'

export interface ProductCard {
  handle: string
  title: string
  subtitle: string
  image: { url: string; alt: string }
  price: { amount: number; currencyCode: 'USD' }
  compareAtPrice: { amount: number; currencyCode: 'USD' } | null
  colors: LeatherColor[]
  // Колір сумки на фото картки: його показуємо вибраним за замовчуванням.
  imageColor: LeatherColor
  badge: 'personalize' | 'new' | 'bestseller' | null
}

export interface CategoryCard {
  handle: string
  labelKey: string
  image: string
}

export const homeCategories: CategoryCard[] = [
  { handle: 'totes', labelKey: 'category.totes', image: '/images/work-tote.jpg' },
  { handle: 'shoulder-bags', labelKey: 'category.shoulderBags', image: '/images/cappuccino-bag.jpg' },
  { handle: 'laptop-work', labelKey: 'category.laptopWork', image: '/images/studded-laptop-tote.jpg' },
  { handle: 'mini-crossbody', labelKey: 'category.miniCrossbody', image: '/images/mini-crossbody.jpg' },
]

export const bestsellers: ProductCard[] = [
  {
    handle: 'studded-laptop-tote',
    title: 'Studded Laptop Tote',
    subtitle: 'Crazy Horse leather, convertible strap',
    image: { url: '/images/studded-laptop-tote.jpg', alt: 'Studded leather laptop tote' },
    price: { amount: 102, currencyCode: 'USD' },
    compareAtPrice: { amount: 120, currencyCode: 'USD' },
    colors: ['black', 'cognac', 'chocolate', 'burgundy', 'green'],
    imageColor: 'cognac',
    badge: 'personalize',
  },
  {
    handle: 'slouchy-hobo-bag',
    title: 'Slouchy Hobo Bag',
    subtitle: 'Oversized shoulder tote',
    image: { url: '/images/slouchy-hobo.jpg', alt: 'Slouchy cognac leather hobo bag' },
    price: { amount: 102, currencyCode: 'USD' },
    compareAtPrice: { amount: 120, currencyCode: 'USD' },
    colors: ['cognac', 'black', 'tan', 'burgundy'],
    imageColor: 'cognac',
    badge: 'personalize',
  },
  {
    handle: 'mini-crossbody-tote',
    title: 'Mini Crossbody Tote',
    subtitle: 'Small everyday bag with zipper',
    image: { url: '/images/mini-crossbody.jpg', alt: 'Small cognac leather crossbody tote' },
    price: { amount: 93.5, currencyCode: 'USD' },
    compareAtPrice: { amount: 110, currencyCode: 'USD' },
    colors: ['burgundy', 'red', 'black', 'cognac'],
    imageColor: 'cognac',
    badge: 'new',
  },
  {
    handle: 'large-cognac-zip-tote',
    title: 'Large Cognac Zip Tote',
    subtitle: 'Unique shape, side pocket',
    image: { url: '/images/large-zip-tote.jpg', alt: 'Large cognac leather tote with zipper' },
    price: { amount: 110.5, currencyCode: 'USD' },
    compareAtPrice: { amount: 130, currencyCode: 'USD' },
    colors: ['caramel', 'black', 'chocolate'],
    imageColor: 'caramel',
    badge: 'bestseller',
  },
]
