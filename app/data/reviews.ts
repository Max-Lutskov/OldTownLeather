// Справжні відгуки з Etsy (otlbags.etsy.com/reviews), усі 5 зірок. Текст мовою оригіналу, трохи скорочений
// без зміни змісту. Перед запуском живого сайту потрібна згода клієнтки; нових відгуків не вигадувати.
// item — ключ i18n у `reviews.items`, date — рік і місяць відгуку.
export interface EtsyReview {
  text: string
  author: string
  item: 'burgundyTote' | 'blackTote' | 'blackToteMonogram'
  date: string
}

export const reviews: EtsyReview[] = [
  {
    text: 'Absolutely stunning tote. It keeps its structure very well, and the leather is to die for!',
    author: 'Caitlin',
    item: 'burgundyTote',
    date: '2026-10',
  },
  {
    text: 'Better than I expected. It arrived pretty much on time, which surprised me as it was shipping from Ukraine. The leather is soft, but sturdy.',
    author: 'Jamie',
    item: 'blackTote',
    date: '2026-10',
  },
  {
    text: 'Purchased this bag in black for my wife, she loves it. High quality, great size, and the monogram is a nice touch. I will purchase more for Christmas gifts.',
    author: 'Mike',
    item: 'blackToteMonogram',
    date: '2026-09',
  },
]
