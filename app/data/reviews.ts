// Справжні відгуки з Etsy (otlbags.etsy.com/reviews), усі 5 зірок, текст дослівно мовою оригіналу.
// Обрані ті, що про шкіру, форму й роботу майстрів. Перед запуском живого сайту потрібна згода клієнтки;
// нових відгуків не вигадувати. Тип EtsyReview — у shared/types/store.ts.
import type { EtsyReview } from '#shared/types/store'

export const reviews: EtsyReview[] = [
  {
    text: 'Absolutely stunning tote. I love the shape of it, it maintains its structure very well, and the leather is to die for!',
    author: 'Caitlin',
    item: 'burgundyTote',
    date: '2026-10',
  },
  {
    text: 'Very nice thick leather and quality is outstanding. I love the size, color and structure.',
    author: 'Mary',
    item: 'greenTote',
    date: '2026-07',
  },
  {
    text: 'Victoria made a thorough job of crafting exactly what I wanted, high quality tote bag and prompt delivery.',
    author: 'Grace',
    item: 'greenLaptopTote',
    date: '2026-10',
  },
]
