<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// На десктопі три фото стоять поруч. На мобільному показуємо по одному і плавно чергуємо.
const slides = [
  { src: '/images/cognac-zip-tote.jpg', altKey: 'hero.altCognac', pos: '50% 35%', posMobile: '50% 35%' },
  { src: '/images/burgundy-tote.jpg', altKey: 'hero.altBurgundy', pos: '22% 50%', posMobile: '30% 50%' },
  { src: '/images/slouchy-hobo.jpg', altKey: 'hero.altSlouchy', pos: '50% 50%', posMobile: '50% 50%' },
]
const INTERVAL = 5000

const current = ref(0)
// Автопоказ лише на мобільному і якщо анімації не вимкнені. Вмикаємо після монтування:
// на сервері розмір екрана невідомий, і так клієнт гідрує ту саму розмітку, що прийшла з сервера.
const mounted = useMounted()
const isMobile = useMediaQuery('(max-width: 760px)')
const motion = usePreferredReducedMotion()
const autoplay = computed(() => mounted.value && isMobile.value && motion.value !== 'reduce')
watch(autoplay, (on) => {
  if (!on) current.value = 0
})
// Палець на фото тримає слайд: смужка прогресу і наїзд камери стають на паузу.
const held = ref(false)

// Перемикання веде сама CSS-анімація смужки: дійшла до кінця, показуємо наступне фото.
// Тому пауза через animation-play-state зупиняє і таймер, і смужку, і продовжує з того ж місця.
function next() {
  current.value = (current.value + 1) % slides.length
}
function goTo(i: number) {
  current.value = i
}
function hold() {
  if (autoplay.value) held.value = true
}
function release() {
  held.value = false
}
</script>

<template>
  <section
    id="top"
    class="hero"
    :class="{ autoplay, held }"
    :aria-label="t('hero.label')"
    :style="{ '--interval': `${INTERVAL}ms` }"
    @pointerdown="hold"
    @pointerup="release"
    @pointercancel="release"
    @pointerleave="release"
  >
    <div class="grid" @contextmenu="(e: MouseEvent) => autoplay && e.preventDefault()">
      <div
        v-for="(s, i) in slides"
        :key="s.src"
        class="photo slide"
        :class="{ active: i === current }"
        :style="{ '--pos': s.pos, '--pos-m': s.posMobile, '--n': i }"
      >
        <NuxtImg
          :src="s.src"
          :alt="t(s.altKey)"
          preset="photo"
          sizes="xs:100vw sm:100vw md:34vw lg:34vw xl:34vw 2xl:34vw"
          :preload="i === 0 ? { fetchPriority: 'high' } : undefined"
          :fetchpriority="i === 0 ? 'high' : undefined"
        />
      </div>
    </div>
    <div class="scrim" aria-hidden="true" />
    <div class="overlay">
      <div class="container copy">
        <div class="text">
          <h1 class="display title">
            <template v-for="(line, i) in t('hero.title').split('\n')" :key="i">
              <br v-if="i">{{ line }}
            </template>
          </h1>
          <p class="lead">{{ t('hero.lead') }}</p>
        </div>
        <div class="ctas">
          <NuxtLink :to="localePath('/collections/all')" class="btn btn--light">{{ t('hero.shop') }}</NuxtLink>
          <NuxtLink :to="localePath('/#personal')" class="btn btn--ghost">{{ t('hero.personalize') }}</NuxtLink>
        </div>
        <div v-if="autoplay" class="controls">
          <button
            v-for="(s, i) in slides"
            :key="s.src"
            type="button"
            class="dot"
            :class="{ active: i === current }"
            :aria-label="t('hero.slide', { n: i + 1, total: slides.length })"
            :aria-current="i === current ? 'true' : undefined"
            @click="goTo(i)"
          >
            <span v-if="i === current" :key="current" class="fill" @animationend="next" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  background: var(--ink);
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  height: calc(100svh - var(--header-h));
  min-height: 560px;
  max-height: 900px;
}
.slide img {
  object-position: var(--pos);
}
.scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--scrim-hero) 0%, var(--scrim-hero) 12%, var(--scrim-clear) 72%);
  pointer-events: none;
}
.overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.copy {
  padding-bottom: 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  color: var(--on-dark);
}
/* Рядки заголовка задані переносами в тексті, тому обмежуємо ширину лише підзаголовка:
   інакше довші українські рядки ламались по одному слову. */
.text {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-shadow: var(--text-shadow-photo);
}
.title {
  font-size: clamp(42px, 4.4vw, 66px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  overflow-wrap: break-word;
  min-width: 0;
  color: var(--on-dark);
}
.lead {
  margin: 0;
  max-width: 400px;
  font-size: 17px;
  line-height: 1.5;
  color: var(--on-dark);
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.btn {
  white-space: nowrap;
  letter-spacing: 0;
}
.btn--light {
  padding: 0 32px;
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}
.btn--light:hover {
  background: var(--paper-deep);
  border-color: var(--paper-deep);
  color: var(--ink);
}
.btn--ghost {
  padding: 0 28px;
  background: transparent;
  border-color: var(--on-dark);
  color: var(--on-dark);
}
.btn--ghost:hover {
  color: var(--accent-on-dark);
  border-color: var(--accent-on-dark);
}
.hero :focus-visible {
  outline-color: var(--accent-on-dark);
}

/* Перемикачі слайдів: тонкі смужки з прогресом */
.controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
.dot {
  width: 40px;
  height: var(--tap);
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  position: relative;
}
.dot::before,
.fill {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  margin-top: -1px;
}
.dot::before {
  background: var(--on-dark);
  opacity: 0.35;
}
.fill {
  background: var(--on-dark);
  transform: scaleX(0);
  transform-origin: left;
}
.fill {
  animation: fill var(--interval) linear forwards;
}
.held .fill {
  animation-play-state: paused;
}
@keyframes fill {
  to {
    transform: none;
  }
}
@keyframes settle {
  from {
    transform: scale(1.08);
  }
  to {
    transform: scale(1);
  }
}

/* Десктоп: після завантаження три фото по черзі «осідають», як слайди на мобільному. Чистий CSS,
   працює ще до гідратації і не затримує LCP (фото видно з першого кадру). */
@media (min-width: 761px) {
  .slide img {
    animation: settle 2.4s var(--ease-out) both;
    animation-delay: calc(var(--n) * 140ms);
  }
}

@media (max-width: 760px) {
  .grid {
    display: block;
    position: relative;
    max-height: 720px;
  }
  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1.2s ease;
  }
  .slide.active {
    opacity: 1;
  }
  .scrim {
    background: var(--scrim-hero-tall);
  }
  .slide img {
    object-position: var(--pos-m);
    -webkit-touch-callout: none;
    user-select: none;
  }
  .autoplay .slide.active img {
    animation: settle 6.5s cubic-bezier(0.25, 0.1, 0.25, 1) both;
  }
  .held .slide.active img {
    animation-play-state: paused;
  }
  .copy {
    padding-bottom: 20px;
  }
  /* На вузьких екранах (320px) 42px не вміщав «зроблені вручну» в рядок */
  .title {
    font-size: clamp(32px, 10.6vw, 42px);
  }
  /* Кнопки одна під одною однакової ширини: обидві тягнуться до ширшої */
  .ctas {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide {
    transition: none !important;
  }
  .slide img {
    animation: none !important;
  }
}
</style>
