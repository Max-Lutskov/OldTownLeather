<script setup lang="ts">
const head = useLocaleHead()
const { t } = useI18n()
const { noindex } = useRuntimeConfig().public

// publicPath викликаємо тут, у setup: у геттерах useHead контексту Nuxt уже немає
const icons = [
  { rel: 'icon', type: 'image/svg+xml', href: publicPath('/favicon.svg') },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: publicPath('/favicon-32.png') },
  { rel: 'apple-touch-icon', href: publicPath('/apple-touch-icon.png') },
] as const

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => [...icons, ...(head.value.link ?? [])],
  meta: () => [
    ...(head.value.meta ?? []),
    ...(noindex ? [{ name: 'robots', content: 'noindex,nofollow' }] : []),
  ],
  titleTemplate: (title) => (title ? `${title}` : t('meta.title')),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
