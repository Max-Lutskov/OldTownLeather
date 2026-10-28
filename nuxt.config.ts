export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          // Noto Serif Display: кирилиця для заголовків (браузер вантажить лише потрібні діапазони символів)
          href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Noto+Serif+Display:wdth,wght@62.5..100,400&family=Manrope:wght@400;500;600;700&display=swap',
        },
      ],
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
      siteUrl: '',
      // true на демо (GitHub Pages): сторінки не індексуються. На бойовому сайті лишити false.
      noindex: false,
    },
  },
})
