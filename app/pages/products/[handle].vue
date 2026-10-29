<script setup lang="ts">
import type { LeatherColor } from '#shared/types/catalog'

// Сторінка товару. Поки демо: будь-який handle показує Studded Laptop Tote (useProduct у useCatalog.ts).
// Опис і рішення: docs/superpowers/specs/2026-10-29-product-page-design.md
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const money = useMoney()
const n = useNumber()

const { data: product } = await useProduct(String(route.params.handle))
const { data: bestsellers } = await useBestsellers()
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}
const item = product.value

// Колір. Сторінки статичні, тож ?color= застосовуємо після монтування (гідрація збігається з HTML збірки)
// і стежимо за route.query: під час гідрації статичної сторінки адреса на мить буває без query.
// Вибір пишемо назад в адресу через history.replaceState: без нового запису в історії і без навігації
// роутера (router.replace у цей момент губив query).
const selected = ref<LeatherColor>(item.defaultColor)
function applyColorFromUrl() {
  const fromUrl = route.query.color
  if (typeof fromUrl === 'string' && item.colors.includes(fromUrl as LeatherColor)) {
    selected.value = fromUrl as LeatherColor
  }
}
onMounted(applyColorFromUrl)
watch(() => route.query.color, applyColorFromUrl)
watch(selected, (color) => {
  const url = new URL(window.location.href)
  url.searchParams.set('color', color)
  history.replaceState(history.state, '', url)
})

// Для кольорів без своїх фото показуємо фото основного кольору і чесно про це пишемо
const ownPhotos = computed(() => item.images[selected.value])
const photos = computed(() => ownPhotos.value ?? item.images[item.defaultColor] ?? [])

const dims = item.dimensions
const inch = (cm: number) => n(Math.round((cm / 2.54) * 10) / 10)
const withInches = (cm: number) => t('product.cm', { cm: n(cm), inch: inch(cm) })
const sizeRows = [
  { key: 'height', value: withInches(dims.heightCm) },
  { key: 'topWidth', value: withInches(dims.topWidthCm) },
  { key: 'bottomWidth', value: withInches(dims.bottomWidthCm) },
  { key: 'depth', value: withInches(dims.depthCm) },
  { key: 'handleDrop', value: withInches(dims.handleDropCm) },
  {
    key: 'strap',
    value: t('product.cmRange', {
      from: n(dims.strapCm[0]),
      to: n(dims.strapCm[1]),
      inchFrom: inch(dims.strapCm[0]),
      inchTo: inch(dims.strapCm[1]),
    }),
  },
]

// Рядок розміру біля ціни відкриває блок «Size & fit» і прокручує до нього
const sizeEl = ref<HTMLDetailsElement | null>(null)
const motion = usePreferredReducedMotion()
async function openSize() {
  if (!sizeEl.value) return
  sizeEl.value.open = true
  await nextTick()
  sizeEl.value.scrollIntoView({ behavior: motion.value === 'reduce' ? 'auto' : 'smooth', block: 'start' })
}

// Мобільна смуга знизу з ціною і кнопкою: з'являється, коли основна кнопка пішла за верхній край екрана
// і ховається, коли видно футер (щоб його не закривати)
const mainBtn = ref<HTMLButtonElement | null>(null)
const passed = ref(false)
useIntersectionObserver(mainBtn, ([entry]) => {
  if (entry) passed.value = !entry.isIntersecting && entry.boundingClientRect.top < 0
})
const footer = ref<HTMLElement | null>(null)
onMounted(() => {
  footer.value = document.querySelector('.site-footer')
})
const footerVisible = useElementVisibility(footer)
const showBar = computed(() => passed.value && !footerVisible.value)

const related = computed(() => bestsellers.value.filter((p) => p.handle !== item.handle))

const firstPhoto = item.images[item.defaultColor]?.[0]
useSeoMeta({
  title: () => `${item.title} | Old Town Leather`,
  description: item.description,
  ogTitle: item.title,
  ogDescription: item.description,
  ogImage: firstPhoto ? absolutePublicUrl(firstPhoto.url) : undefined,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <div class="container product">
      <nav class="crumbs" :aria-label="t('product.breadcrumb')">
        <ol>
          <li><NuxtLink :to="localePath('/')">{{ t('product.home') }}</NuxtLink></li>
          <li>
            <NuxtLink :to="localePath(`/collections/${item.category.handle}`)">{{ t(item.category.labelKey) }}</NuxtLink>
          </li>
          <li aria-current="page">{{ item.title }}</li>
        </ol>
      </nav>

      <div class="layout">
        <ProductGallery
          class="gallery"
          :images="photos"
          :all-images="Object.values(item.images)"
          :label="t('product.photos', { title: item.title })"
        />

        <div class="info">
          <div class="intro">
            <h1 class="display title">{{ item.title }}</h1>
            <p class="lead">{{ item.description }}</p>
            <p class="price">{{ money(item.price) }}</p>
          </div>

          <fieldset class="colors">
            <legend class="colors-label">
              {{ t('product.colour') }}: <span>{{ t(`color.${selected}`) }}</span>
            </legend>
            <div class="swatches">
              <label v-for="c in item.colors" :key="c" class="swatch" :title="t(`color.${c}`)">
                <input v-model="selected" class="visually-hidden" type="radio" name="color" :value="c">
                <span class="dot" :style="{ background: `var(--leather-${c})` }" />
                <span class="visually-hidden">{{ t(`color.${c}`) }}</span>
              </label>
            </div>
            <p v-if="!ownPhotos" class="photo-note">
              {{ t('product.photosShow', { color: t(`color.${item.defaultColor}`).toLowerCase() }) }}
            </p>
          </fieldset>

          <button type="button" class="size-line" @click="openSize">
            {{
              t('product.sizeLine', {
                height: n(dims.heightCm),
                width: n(dims.topWidthCm),
                depth: n(dims.depthCm),
                laptop: dims.laptopInches,
              })
            }}
          </button>

          <div class="buy">
            <!-- Кошика ще немає: кнопка без дії, жодних фейкових «Added» -->
            <button ref="mainBtn" type="button" class="btn btn--primary add">
              {{ t('product.addToCart', { price: money(item.price) }) }}
            </button>
            <NuxtLink :to="localePath('/personalization')" class="text-link personalize">
              {{ t('product.personalize') }}
            </NuxtLink>
          </div>

          <div class="accordion">
            <details>
              <summary>{{ t('product.details') }}<span class="plus" aria-hidden="true" /></summary>
              <ul class="details-list">
                <li v-for="line in item.details" :key="line">{{ line }}</li>
              </ul>
            </details>
            <details ref="sizeEl" class="size">
              <summary>{{ t('product.size') }}<span class="plus" aria-hidden="true" /></summary>
              <div class="size-body">
                <ProductSizeDiagram :dimensions="dims" />
                <dl class="size-list">
                  <div v-for="row in sizeRows" :key="row.key">
                    <dt>{{ t(`product.dims.${row.key}`) }}</dt>
                    <dd>{{ row.value }}</dd>
                  </div>
                </dl>
                <p class="laptop">{{ t('product.dims.laptop', { n: dims.laptopInches }) }}</p>
              </div>
            </details>
            <details>
              <summary>{{ t('product.shipping') }}<span class="plus" aria-hidden="true" /></summary>
              <p class="text">{{ t('product.shippingText') }}</p>
            </details>
            <details>
              <summary>{{ t('product.care') }}<span class="plus" aria-hidden="true" /></summary>
              <p class="text">{{ t('product.careText') }}</p>
            </details>
          </div>
        </div>
      </div>
    </div>

    <section v-if="related.length" aria-labelledby="related-h" class="related">
      <div class="container inner">
        <h2 id="related-h" v-reveal class="display heading">{{ t('product.alsoLike') }}</h2>
        <div class="grid">
          <ProductCard v-for="(p, i) in related" :key="p.handle" v-reveal="i" :product="p" />
        </div>
      </div>
    </section>

    <div class="buy-bar" :class="{ show: showBar }" :inert="!showBar">
      <span class="bar-text">
        <b>{{ money(item.price) }}</b>
        {{ t(`color.${selected}`) }}
      </span>
      <button type="button" class="btn btn--primary">{{ t('product.addToCartShort') }}</button>
    </div>
  </div>
</template>

<style scoped>
.product {
  padding-top: 20px;
  padding-bottom: 96px;
}

.crumbs ol {
  list-style: none;
  margin: 0 0 24px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}
.crumbs li + li::before {
  content: "/";
  margin-right: 6px;
}
.crumbs a {
  color: var(--muted);
}
.crumbs a:hover {
  color: var(--accent);
}
.crumbs [aria-current] {
  color: var(--ink);
}

.layout {
  display: flex;
  gap: 56px;
  align-items: flex-start;
}
.gallery {
  flex: 1 1 0;
  min-width: 0;
}
/* Колонка з інформацією стоїть на місці, поки гортаються фото. Якщо з відкритими блоками вона вища за екран,
   гортається сама (інакше низ закріпленої колонки не видно). Поля 4px, щоб кільця фокусу не обрізались. */
.info {
  --info-top: calc(var(--header-h) - var(--header-shrink) + 24px);
  flex: 0 1 400px;
  min-width: 320px;
  position: sticky;
  top: var(--info-top);
  max-height: calc(100vh - var(--info-top) - 16px);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 4px;
  margin: -4px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.info > * {
  flex-shrink: 0;
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.title {
  font-size: clamp(40px, 4vw, 52px);
  line-height: 1.02;
}
.lead {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.price {
  margin: 4px 0 0;
  font-size: 24px;
  font-weight: 700;
}

/* Кольори: кружечки 44px, вибраний обведений темним кільцем */
.colors {
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 0;
}
.colors-label {
  padding: 0;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}
.colors-label span {
  font-weight: 400;
  color: var(--ink-soft);
}
.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.swatch {
  width: var(--tap);
  height: var(--tap);
  padding: 5px;
  box-sizing: border-box;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  display: flex;
  cursor: pointer;
}
.swatch:hover {
  box-shadow: inset 0 0 0 1px var(--ink-soft);
}
.swatch:has(input:checked) {
  box-shadow: inset 0 0 0 2px var(--ink);
}
.swatch:has(input:focus-visible) {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
.dot {
  flex: 1;
  border-radius: 50%;
}
.photo-note {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--muted);
}

.size-line {
  align-self: flex-start;
  min-height: var(--tap);
  padding: 0;
  background: none;
  border: 0;
  font: 500 14px var(--font-body);
  color: var(--ink-soft);
  text-align: left;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  cursor: pointer;
}
.size-line:hover {
  color: var(--accent);
}

.buy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.add {
  width: 100%;
  min-height: 56px;
  font-size: 16px;
}
.personalize {
  display: inline-flex;
  align-items: center;
  min-height: var(--tap);
  box-sizing: border-box;
}

/* Розкривні блоки */
.accordion {
  border-top: 1px solid var(--line);
}
.accordion details {
  border-bottom: 1px solid var(--line);
}
.accordion summary {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.accordion summary::-webkit-details-marker {
  display: none;
}
.plus {
  position: relative;
  width: 12px;
  height: 12px;
  transition: transform 0.3s var(--ease-out);
}
.plus::before,
.plus::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1.5px;
  margin-top: -0.75px;
  background: var(--ink);
}
.plus::after {
  transform: rotate(90deg);
}
details[open] .plus {
  transform: rotate(45deg);
}
.details-list {
  margin: 0 0 18px;
  padding-left: 18px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--ink-soft);
}
.text {
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 1.7;
  color: var(--ink-soft);
}
.size-body {
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.size-list {
  margin: 0;
  display: grid;
  gap: 6px;
  font-size: 14px;
}
.size-list div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
.size-list dt {
  color: var(--ink-soft);
}
.size-list dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
.laptop {
  margin: 0;
  font-size: 14px;
  color: var(--ink-soft);
}
/* Прокрутка до блоку розмірів не ховає його під шапкою */
.size {
  scroll-margin-top: 16px;
}

.related {
  background: var(--paper-deep);
}
.related .inner {
  padding-top: 72px;
  padding-bottom: 72px;
}
.related .heading {
  font-size: 44px;
  margin-bottom: 32px;
}
.related .grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

/* Мобільна смуга з ціною і кнопкою */
.buy-bar {
  display: none;
}

@media (max-width: 760px) {
  .product {
    padding-top: 12px;
    padding-bottom: 56px;
  }
  .crumbs ol {
    margin-bottom: 12px;
  }
  .layout {
    flex-direction: column;
    gap: 28px;
  }
  .gallery {
    width: 100%;
  }
  .info {
    position: static;
    max-height: none;
    overflow: visible;
    min-width: 0;
    width: 100%;
  }
  .title {
    font-size: 36px;
  }
  .related .inner {
    padding-top: 56px;
    padding-bottom: 56px;
  }
  .related .heading {
    font-size: 34px;
    margin-bottom: 24px;
  }
  .related .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
  }

  .buy-bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    align-items: center;
    gap: 16px;
    padding: 12px var(--gutter) calc(12px + env(safe-area-inset-bottom));
    background: var(--paper);
    border-top: 1px solid var(--line);
    transform: translateY(100%);
    transition: transform 0.35s var(--ease-out);
  }
  .buy-bar.show {
    transform: none;
  }
  .bar-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    color: var(--ink-soft);
  }
  .bar-text b {
    font-size: 17px;
    color: var(--ink);
  }
}

@media (prefers-reduced-motion: reduce) {
  .plus,
  .buy-bar {
    transition: none;
  }
}
</style>
