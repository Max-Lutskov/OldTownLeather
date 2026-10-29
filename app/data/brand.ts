import type { StoreContacts } from '#shared/types/store'

// Справжні цифри з Etsy (otlbags.etsy.com), стан на жовтень 2026. Оновлювати вручну, не вигадувати.
export const etsy = {
  url: 'https://otlbags.etsy.com/',
  since: 2017,
  orders: 2566,
  rating: 4.9,
  reviews: 794,
  designs: 122,
} as const

// Поки клієнтка не надала контакти, тут null: футер показує заглушки.
export const contacts: StoreContacts = {
  email: null,
  instagram: null,
  phone: null,
}

export const paymentMethods = ['Visa', 'Mastercard', 'Apple Pay', 'Google Pay'] as const
