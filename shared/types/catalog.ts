// Типи каталогу. Спільні для клієнта й сервера: коли з'явиться проксі до Shopify (server/api),
// він віддаватиме дані саме в цій формі. Форма близька до відповіді Storefront API.

export type LeatherColor =
  | 'black'
  | 'cognac'
  | 'chocolate'
  | 'burgundy'
  | 'green'
  | 'tan'
  | 'red'
  | 'caramel'

// Як MoneyV2 у Storefront API. currencyCode — код ISO 4217 (USD, EUR, UAH…)
export interface Money {
  amount: number
  currencyCode: string
}

export interface ProductImage {
  url: string
  alt: string
}

// Товар у списках: бестселери, каталог, «вам також сподобається». Не повна сторінка товару.
export interface ProductSummary {
  handle: string
  title: string
  subtitle: string
  image: ProductImage
  price: Money
  compareAtPrice: Money | null
  colors: LeatherColor[]
  // Колір сумки на фото картки: його показуємо вибраним за замовчуванням.
  imageColor: LeatherColor
  badge: 'personalize' | 'new' | 'bestseller' | null
}

// Плитка категорії на головній. labelKey — ключ i18n для підпису.
export interface HomeCategory {
  handle: string
  labelKey: string
  image: string
}

// Розміри сумки в сантиметрах (дюйми рахуються на сторінці). strapCm — регульований ремінь, від і до.
export interface ProductDimensions {
  heightCm: number
  topWidthCm: number
  bottomWidthCm: number
  depthCm: number
  handleDropCm: number
  strapCm: [number, number]
  laptopInches: number
}

// Повна сторінка товару. images — фото за кольором; для кольорів без фото показуємо фото defaultColor.
// category — для хлібних крихт: handle колекції і ключ i18n її назви.
export interface ProductDetail {
  handle: string
  title: string
  description: string
  price: Money
  colors: LeatherColor[]
  defaultColor: LeatherColor
  images: Partial<Record<LeatherColor, ProductImage[]>>
  details: string[]
  dimensions: ProductDimensions
  category: { handle: string; labelKey: string }
}
