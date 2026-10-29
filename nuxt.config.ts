export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/image', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      meta: [{ name: 'theme-color', content: '#F4EFE8' }],
    },
  },

  // Шрифти скачуються під час збірки й віддаються з нашого сайту, без запитів до Google
  // (швидше і без передачі IP відвідувачів з ЄС). Сімейства задані явно, бо в CSS вони стоять
  // у змінних (--font-display, --font-body), які модуль сам не знаходить.
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
      styles: ['normal'],
    },
    families: [
      // Без метричного фолбека: він покриває всі символи і перехоплював би кирилицю раніше за Noto Serif Display
      { name: 'Instrument Serif', provider: 'google', weights: [400], global: true, preload: true, fallbacks: [] },
      { name: 'Manrope', provider: 'google', weights: [400, 500, 600, 700], global: true, preload: true },
      // Кирилиця для заголовків. Вісь ширини потрібна для --display-stretch
      {
        name: 'Noto Serif Display',
        provider: 'google',
        weights: [400],
        subsets: ['cyrillic', 'cyrillic-ext'],
        variableAxis: { wdth: [{ min: 62.5, max: 100 }] },
        global: true,
      },
    ],
  },

  // Фото стискаються в WebP потрібних ширин під час збірки (ipx). Коли фото підуть з Shopify CDN,
  // тут міняється провайдер, а компоненти лишаються.
  // sizes у <NuxtImg>: кожен запис «екран:ширина» діє від цього екрана (xs 320, sm 640, md 768, lg 1024,
  // xl 1280, 2xl 1536), і ширина файлу рахується від нього. Значення без префікса рахується від 1px,
  // тому завжди починати з xs:, а на xl (контейнер 1280) ставити ширину в px.
  image: {
    quality: 72,
    presets: {
      photo: { modifiers: { format: 'webp' } },
    },
  },

  // Статична збірка (демо на GitHub Pages): сторінки задаємо явно. Обхід посилань вимкнено,
  // бо каталогу, «Про нас» тощо ще немає і їхні 404 зупиняли б збірку. Додавати сюди нові сторінки.
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/ua'],
    },
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ua', language: 'uk-UA', name: 'Українська', file: 'ua.json' },
    ],
    detectBrowserLanguage: false,
    // Домен для canonical і hreflang задається змінною NUXT_PUBLIC_I18N_BASE_URL (як і NUXT_PUBLIC_SITE_URL,
    // без підпапки: app.baseURL i18n додає сам)
  },

  // Секрети лише в runtimeConfig без public. Значення з .env (NUXT_*).
  runtimeConfig: {
    shopifyStoreDomain: '',
    shopifyStorefrontToken: '',
    shopifyAdminToken: '',
    shopifyWebhookSecret: '',
    liqpayPublicKey: '',
    liqpayPrivateKey: '',
    novaposhtaApiKey: '',
    public: {
      // Домен сайту без підпапки й без слеша в кінці, напр. https://max-lutskov.github.io.
      // Потрібен для абсолютних посилань: canonical, hreflang, og:image.
      siteUrl: '',
      // true на демо (GitHub Pages): сторінки не індексуються. На бойовому сайті лишити false.
      noindex: false,
    },
  },
})
