<script setup lang="ts">
import { etsy } from '~/data/brand'

const { t } = useI18n()
const n = useNumber()

// Лише справжні відгуки з Etsy, з дозволу клієнтки. Поки порожньо, показуємо заглушки.
const reviews: { text: string; author: string }[] = []
const slots = computed(() =>
  reviews.length ? reviews : [1, 2].map(() => ({ text: '[Customer review from Etsy]', author: '[Name, country]' })),
)
</script>

<template>
  <section aria-labelledby="rev-h" class="reviews">
    <div class="container inner">
      <div class="score">
        <h2 id="rev-h" class="display rating">{{ n(etsy.rating) }}</h2>
        <span class="stars" role="img" :aria-label="t('reviews.rated', { rating: n(etsy.rating) })">
          <svg v-for="i in 5" :key="i" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" /></svg>
        </span>
        <span class="caption">{{ t('reviews.caption', { count: n(etsy.reviews) }) }}</span>
      </div>
      <div class="quotes">
        <figure v-for="(r, i) in slots" :key="i" class="quote">
          <blockquote class="display">{{ r.text }}</blockquote>
          <figcaption>{{ r.author }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reviews {
  background: var(--paper-deep);
}
.inner {
  padding-top: 72px;
  padding-bottom: 72px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px 56px;
  align-items: center;
}
.score {
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rating {
  font-size: 96px;
  line-height: 1;
}
.stars {
  display: flex;
  gap: 4px;
  color: var(--accent);
}
.caption {
  font-size: 15px;
  color: var(--ink-soft);
}
.quotes {
  flex: 2 1 520px;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.quote {
  flex: 1 1 240px;
  margin: 0;
  background: var(--paper);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.quote blockquote {
  margin: 0;
  font-size: 22px;
  line-height: 1.35;
}
.quote figcaption {
  font-size: 13px;
  color: var(--muted);
}

@media (max-width: 760px) {
  .inner {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 28px;
  }
  .rating {
    font-size: 72px;
    font-variant-numeric: tabular-nums;
  }
}
</style>
