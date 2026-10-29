// Дані магазину, що не приходять з Shopify: контакти й відгуки.

// null — клієнтка ще не надала, на сайті показуємо заглушку.
export interface StoreContacts {
  email: string | null
  instagram: string | null
  phone: string | null
}

// Справжній відгук з Etsy (дані в app/data/reviews.ts). item — ключ i18n у `reviews.items`,
// date — рік і місяць відгуку у форматі YYYY-MM.
export interface EtsyReview {
  text: string
  author: string
  item: 'burgundyTote' | 'blackTote' | 'blackToteMonogram'
  date: string
}
