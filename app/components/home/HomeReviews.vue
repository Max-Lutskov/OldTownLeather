<script setup lang="ts">
import { etsy } from '~/data/brand'
import { reviews } from '~/data/reviews'

const { t, locale } = useI18n()
const n = useNumber()

// "October 2026" / "жовтень 2026 р."
function month(ym: string) {
  const [y, m] = ym.split('-').map(Number)
  return new Intl.DateTimeFormat(locale.value === 'ua' ? 'uk-UA' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y!, m! - 1, 1)))
}
</script>

<template>
  <section aria-labelledby="rev-h" class="reviews">
    <div class="container inner">
      <div v-reveal class="head">
        <div class="score">
          <!-- Для скрінрідера заголовок секції словами, оцінку з 5 озвучують зірки поруч -->
          <h2 id="rev-h" class="display rating">
            <span class="visually-hidden">{{ t('reviews.title') }}</span>
            <span aria-hidden="true">{{ n(etsy.rating) }}</span>
          </h2>
          <div class="score-meta">
            <span class="stars" role="img" :aria-label="t('reviews.rated', { rating: n(etsy.rating) })">
              <svg v-for="i in 5" :key="i" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" /></svg>
            </span>
            <span class="caption">{{ t('reviews.caption', { count: n(etsy.reviews) }, etsy.reviews) }}</span>
          </div>
        </div>
        <a :href="`${etsy.url}reviews`" class="text-link all" target="_blank" rel="noopener">{{ t('reviews.all') }}</a>
      </div>

      <div v-if="reviews.length" class="quotes">
        <figure v-for="(r, i) in reviews" :key="r.author + r.date" v-reveal="i" class="quote">
          <blockquote class="display" :lang="locale === 'ua' ? 'en' : undefined">{{ r.text }}</blockquote>
          <figcaption class="who">
            <span class="name">{{ r.author }}, {{ t(`reviews.items.${r.item}`) }}</span>
            <span class="when">{{ t('reviews.source', { date: month(r.date) }) }}</span>
          </figcaption>
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
  padding-top: 96px;
  padding-bottom: 96px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}
.head {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 40px;
  align-items: flex-end;
  justify-content: space-between;
}
.score {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  align-items: flex-end;
}
.rating {
  font-size: 112px;
  line-height: 0.9;
  font-variant-numeric: tabular-nums;
}
.score-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 8px;
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
.all {
  margin-bottom: 10px;
}
.quotes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
}
.quote {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  border-top: 1px solid var(--line-strong);
  padding-top: 24px;
}
.quote blockquote {
  margin: 0;
  font-size: 25px;
  line-height: 1.3;
  text-wrap: pretty;
}
.who {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
}
.name {
  font-weight: 700;
}
.when {
  color: var(--muted);
}

@media (max-width: 760px) {
  .inner {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 32px;
  }
  .rating {
    font-size: 72px;
  }
  .quotes {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
  .quote blockquote {
    font-size: 21px;
  }
}
</style>
