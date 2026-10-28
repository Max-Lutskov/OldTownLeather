<script setup lang="ts">
const head = useLocaleHead()
const { t } = useI18n()
const { noindex } = useRuntimeConfig().public

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link ?? [],
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
