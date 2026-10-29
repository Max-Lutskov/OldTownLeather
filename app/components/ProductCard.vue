<script setup lang="ts">
import type { LeatherColor, ProductSummary } from '#shared/types/catalog'

const props = defineProps<{ product: ProductSummary }>()

const { t } = useI18n()
const localePath = useLocalePath()
const money = useMoney()

const badgeKey = computed(() => (props.product.badge ? `badge.${props.product.badge}` : null))

// Вибраний колір: за замовчуванням той, що на фото. Передаємо його на сторінку товару через ?color=.
const selected = ref<LeatherColor>(props.product.imageColor)
const href = computed(() =>
  localePath({ path: `/products/${props.product.handle}`, query: { color: selected.value } }),
)
</script>

<template>
  <article class="card">
    <NuxtLink :to="href" class="photo media" tabindex="-1" aria-hidden="true">
      <img :src="publicPath(product.image.url)" :alt="product.image.alt" loading="lazy">
      <span v-if="badgeKey" class="badge">{{ t(badgeKey) }}</span>
    </NuxtLink>
    <div class="info">
      <NuxtLink :to="href" class="title">{{ product.title }}</NuxtLink>
      <span class="subtitle">{{ product.subtitle }}</span>
      <span class="prices">
        <span class="price">
          <span v-if="product.compareAtPrice" class="visually-hidden">{{ t('product.salePrice') }}</span>
          {{ money(product.price) }}
        </span>
        <s v-if="product.compareAtPrice" class="old-price">
          <span class="visually-hidden">{{ t('product.regularPrice') }}</span>
          {{ money(product.compareAtPrice) }}
        </s>
      </span>
      <div class="colors">
        <div class="swatches" role="radiogroup" :aria-label="t('product.colorFor', { title: product.title })">
          <label v-for="c in product.colors" :key="c" class="swatch" :title="t(`color.${c}`)">
            <input
              v-model="selected"
              class="visually-hidden"
              type="radio"
              :name="`color-${product.handle}`"
              :value="c"
            >
            <span class="dot" :style="{ background: `var(--leather-${c})` }" />
            <span class="visually-hidden">{{ t(`color.${c}`) }}</span>
          </label>
        </div>
        <span class="color-name" aria-hidden="true">{{ t(`color.${selected}`) }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  flex: 1 1 260px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.media {
  aspect-ratio: 4 / 5;
  display: flex;
  align-items: flex-start;
  padding: 14px;
  box-sizing: border-box;
}
.badge {
  position: relative;
  background: var(--paper);
  color: var(--ink);
  font-size: 12px;
  font-weight: 600;
  padding: 5px 9px;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
}
.subtitle {
  font-size: 14px;
  color: var(--muted);
}
.prices {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.price {
  font-size: 17px;
  font-weight: 700;
}
.old-price {
  font-size: 14px;
  color: var(--muted);
}

/* Кольори: кружечок 16px, зона натиску 28px (WCAG 2.5.8 вимагає від 24px), вибраний обведений тонким кільцем */
.colors {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px 8px;
}
.swatches {
  display: flex;
  margin-left: -6px;
}
.swatch {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  box-sizing: border-box;
  transition: box-shadow 0.2s ease;
}
.swatch:hover .dot {
  box-shadow: 0 0 0 2px var(--paper-deep), 0 0 0 3px var(--line-strong);
}
.swatch:has(input:checked) .dot {
  box-shadow: 0 0 0 2px var(--paper-deep), 0 0 0 3px var(--ink);
}
.swatch:has(input:focus-visible) .dot {
  outline: 2px solid var(--focus);
  outline-offset: 5px;
}
.color-name {
  font-size: 13px;
  color: var(--ink-soft);
}

@media (max-width: 760px) {
  .subtitle {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dot {
    transition: none;
  }
}
</style>
