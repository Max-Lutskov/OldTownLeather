# OTL shop (Nuxt 4)

Магазин Old Town Leather: Nuxt 4 + headless Shopify. Повний контекст у `../CONTEXT_1.md`, візуальний еталон у `../index.html` і `../product.html`.

```bash
npm install
cp .env.example .env   # заповнити ключі
npm run dev            # http://localhost:3000, UA: /ua
npm run typecheck
```

## Структура

- `app/assets/css/main.css`: дизайн-токени (`:root`) і базові стилі. Кольори й шрифти в компонентах лише через `var(--…)`.
- `app/components/layout/`: топ-бар, шапка, футер.
- `app/components/home/`: секції головної.
- `app/components/ProductCard.vue`: картка товару (бестселери, каталог, «You may also like»).
- `app/data/`: тимчасові дані до підключення Shopify (`catalog.ts`) і справжні цифри з Etsy (`brand.ts`).
- `i18n/locales/`: тексти EN і UA. Код локалі `ua` (URL `/ua`), для Intl мапиться на `uk-UA` у `composables/useMoney.ts`.
- `public/images/`: фото з демо. На живому сайті фото йдуть з Shopify CDN.
