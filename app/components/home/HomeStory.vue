<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="story" aria-labelledby="story-h" class="container story">
    <div v-reveal class="photo media">
      <NuxtImg src="/images/founders.jpg" :alt="t('story.alt')" preset="photo" sizes="xs:100vw sm:100vw md:100vw lg:44vw xl:560px" loading="lazy" />
    </div>
    <div v-reveal="1" class="copy">
      <h2 id="story-h" class="display heading">{{ t('story.title') }}</h2>
      <p class="text">{{ t('story.text') }}</p>
      <NuxtLink :to="localePath('/about')" class="text-link more">{{ t('story.more') }}</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.story {
  padding-top: 88px;
  padding-bottom: 88px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  align-items: center;
}
/* Вертикальний портрет засновників: кадр 4:5, обрізаємо зверху менше, щоб обличчя не впиралися в край */
.media {
  flex: 1 1 420px;
  max-width: 560px;
  min-width: 0;
  aspect-ratio: 4 / 5;
}
.media img {
  object-position: 50% 30%;
}
.copy {
  flex: 1.2 1 420px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.heading {
  font-size: clamp(38px, 4.5vw, 52px);
  line-height: 1.05;
}
.text {
  margin: 0;
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink-soft);
}
.more {
  align-self: flex-start;
}

@media (max-width: 760px) {
  .story {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 28px;
  }
  .heading {
    font-size: 34px;
    line-height: 1.08;
  }
}
</style>
