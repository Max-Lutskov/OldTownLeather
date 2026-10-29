<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogImage: absolutePublicUrl('/images/cognac-zip-tote.jpg'),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeCategories />
    <HomeBestsellers />
    <HomePersonalize />
    <HomeLeather />
    <HomeReviews />
    <HomeStory />
  </div>
</template>
