<script setup lang="ts">
import type { ProductImage } from '#shared/types/catalog'

// Фото товару. Десктоп: стрічка, перше фото на всю ширину, далі по два в ряд (колонка з інформацією поруч
// закріплена). Мобільний: та сама розмітка стає слайдером на всю ширину (CSS scroll-snap, без бібліотек),
// крапки під ним показують поточне фото. Фото квадратні (оригінали з Etsy 1:1), тож нічого не обрізається.
// allImages — фото всіх кольорів: під час статичної збірки їх треба підготувати заздалегідь, бо фото іншого
// кольору з'являються вже в браузері (@nuxt/image стискає лише ті, що бачить під час рендеру).
const props = defineProps<{ images: ProductImage[]; allImages?: ProductImage[][]; label: string }>()

const SIZES_FIRST = 'xs:100vw sm:100vw md:58vw lg:58vw xl:740px'
const SIZES_REST = 'xs:100vw sm:100vw md:29vw lg:29vw xl:370px'

if (import.meta.server && props.allImages) {
  const img = useImage()
  for (const list of props.allImages) {
    list.forEach((photo, i) => img.getSizes(photo.url, { sizes: i === 0 ? SIZES_FIRST : SIZES_REST, preset: 'photo' }))
  }
}

const track = ref<HTMLElement | null>(null)
const { x } = useScroll(track)
const { width } = useElementSize(track)
const current = computed(() => (width.value ? Math.round(x.value / width.value) : 0))

// Інший колір: слайдер знову з першого фото
watch(
  () => props.images,
  () => track.value?.scrollTo({ left: 0 }),
)
</script>

<template>
  <div class="gallery">
    <!-- tabindex: на мобільному слайдер гортається й стрілками з клавіатури -->
    <ul ref="track" class="track" tabindex="0" :aria-label="label">
      <li v-for="(img, i) in images" :key="img.url" class="slide photo">
        <NuxtImg
          :src="img.url"
          :alt="img.alt"
          preset="photo"
          :sizes="i === 0 ? SIZES_FIRST : SIZES_REST"
          :loading="i === 0 ? undefined : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : undefined"
          :preload="i === 0 ? { fetchPriority: 'high' } : undefined"
        />
      </li>
    </ul>
    <div v-if="images.length > 1" class="dots" aria-hidden="true">
      <span v-for="(img, i) in images" :key="img.url" :class="{ on: i === current }" />
    </div>
  </div>
</template>

<style scoped>
.track {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.slide {
  aspect-ratio: 1 / 1;
}
.slide:first-child {
  grid-column: 1 / -1;
}
.dots {
  display: none;
}

@media (max-width: 760px) {
  /* Слайдер на всю ширину екрана: виходимо за бокові поля контейнера */
  .track {
    display: flex;
    gap: 0;
    margin: 0 calc(-1 * var(--gutter));
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
  }
  .track::-webkit-scrollbar {
    display: none;
  }
  .track:focus-visible {
    outline-offset: -3px;
  }
  .slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
  }
  .dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-top: 14px;
  }
  .dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink);
    opacity: 0.25;
    transition: transform 0.25s var(--ease-out), opacity 0.25s ease;
  }
  .dots .on {
    opacity: 1;
    transform: scale(1.35);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dots span {
    transition: none;
  }
}
</style>
