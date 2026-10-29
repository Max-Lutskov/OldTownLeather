<script setup lang="ts">
// Ініціали, витиснені на фото шкіри. Кладеться поверх фото leather-pocket.jpg (1200×1050, object-fit: cover)
// усередині контейнера з position: relative.
//
// Два шари SVG з тим самим текстом:
// 1. press — продавлена шкіра темнішає: м'яко розмита заливка в режимі multiply, фактура шкіри лишається видно.
// 2. relief — стінки заглибини: освітлення (feDiffuseLighting) від «вдавленої» форми літер, світло зверху зліва,
//    як на фото. Рівна поверхня після фільтра стає нейтрально сірою (0.5), тож у режимі soft-light фото не змінює.
// Розміри фільтрів у одиницях viewBox, тому ефект однаково виглядає і на великому фото, і на мініатюрі в меню.
const props = withDefaults(defineProps<{ text: string; announce?: boolean }>(), { announce: false })

const id = useId()
const pressId = `deboss-press-${id}`
const reliefId = `deboss-relief-${id}`
// Ширина літер залежить від кількості знаків: «V.K.» і «О.Л.Я.» мають вміщатися в кишеню
const fontSize = computed(() => (props.text.length > 4 ? 210 : 250))
</script>

<template>
  <div class="deboss">
    <svg class="layer press" viewBox="0 0 1200 1050" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter :id="pressId" x="-10%" y="-20%" width="120%" height="140%" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" />
        </filter>
      </defs>
      <text
        class="glyphs"
        x="600"
        y="575"
        :font-size="fontSize"
        :filter="`url(#${pressId})`"
      >{{ text }}</text>
    </svg>

    <svg class="layer relief" viewBox="0 0 1200 1050" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter :id="reliefId" x="-10%" y="-20%" width="120%" height="140%" color-interpolation-filters="sRGB">
          <!-- Профіль заглибини: м'які стінки, а не різкий край -->
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="bump" />
          <!-- Від'ємний масштаб: літери вдавлені, а не випуклі -->
          <feDiffuseLighting in="bump" surfaceScale="-5" diffuseConstant="1" lighting-color="#fff" result="lit">
            <feDistantLight azimuth="235" elevation="50" />
          </feDiffuseLighting>
          <!-- Рівна поверхня дає sin(50°) ≈ 0.766; множимо на 0.653, щоб вона стала 0.5 (нейтраль для soft-light) -->
          <feComponentTransfer in="lit" result="shade">
            <feFuncR type="linear" slope="0.653" />
            <feFuncG type="linear" slope="0.653" />
            <feFuncB type="linear" slope="0.653" />
          </feComponentTransfer>
          <!-- Лише біля літер, далі шар прозорий -->
          <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="near" />
          <feGaussianBlur in="near" stdDeviation="4" result="near-soft" />
          <feComposite in="shade" in2="near-soft" operator="in" />
        </filter>
      </defs>
      <text
        class="glyphs"
        x="600"
        y="575"
        :font-size="fontSize"
        :filter="`url(#${reliefId})`"
      >{{ text }}</text>
    </svg>

    <span v-if="announce" class="visually-hidden" aria-live="polite">{{ text }}</span>
  </div>
</template>

<style scoped>
.deboss {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.glyphs {
  font-family: var(--font-display);
  font-stretch: var(--display-stretch);
  letter-spacing: 0.06em;
  text-anchor: middle;
  dominant-baseline: central;
}
.press {
  mix-blend-mode: multiply;
}
.press .glyphs {
  fill: var(--deboss-press);
}
.relief {
  mix-blend-mode: soft-light;
  opacity: var(--deboss-relief);
}
</style>
