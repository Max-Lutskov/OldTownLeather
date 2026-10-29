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

// На мобільному в ряд картки влазить лише 4 кружечки, решту ховаємо за «+N» (усі кольори є на сторінці товару).
// Колір з фото лишається видимим, навіть якщо він далі в списку.
const MOBILE_SWATCHES = 4
const mobileColors = computed(() => {
  const first = props.product.colors.slice(0, MOBILE_SWATCHES)
  if (first.includes(props.product.imageColor)) return first
  return [...first.slice(0, -1), props.product.imageColor]
})
const hiddenOnMobile = computed(() => props.product.colors.length - mobileColors.value.length)

// Статична збірка (обхід посилань вимкнено): картка сама додає сторінку свого товару до пререндеру
prerenderRoutes(localePath(`/products/${props.product.handle}`))
</script>

<template>
  <article class="card">
    <NuxtLink :to="href" class="photo media" tabindex="-1" aria-hidden="true">
      <NuxtImg :src="product.image.url" :alt="product.image.alt" preset="photo" sizes="xs:50vw sm:50vw md:34vw lg:25vw xl:300px" loading="lazy" />
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
          <label
            v-for="c in product.colors"
            :key="c"
            class="swatch"
            :class="{ 'desktop-only': !mobileColors.includes(c) }"
            :title="t(`color.${c}`)"
          >
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
        <span v-if="hiddenOnMobile" class="more" aria-hidden="true">+{{ hiddenOnMobile }}</span>
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
.more {
  display: none;
  font-size: 13px;
  color: var(--ink-soft);
}

/* Лише на пристроях з мишкою: фото повільно наближається, назва підкреслюється */
@media (hover: hover) and (pointer: fine) {
  .media img {
    transition: transform 0.9s var(--ease-out);
  }
  .card:hover .media img {
    transform: scale(1.04);
  }
  .card:hover .title {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
}

@media (max-width: 760px) {
  .subtitle {
    display: none;
  }
  .swatch.desktop-only {
    display: none;
  }
  .more {
    display: block;
    margin-left: -4px;
  }
  /* Назва кольору завжди окремим рядком, щоб картки в ряду виглядали однаково */
  .colors {
    column-gap: 4px;
  }
  .color-name {
    flex-basis: 100%;
  }
}
@media (prefers-reduced-motion: reduce) {
  .dot,
  .media img {
    transition: none;
  }
  .card:hover .media img {
    transform: none;
  }
}
</style>
