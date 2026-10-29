<script setup lang="ts">
import type { ProductDimensions } from '#shared/types/catalog'

// Креслення сумки з розмірами: спереду (трапеція з ручкою) і збоку (глибина). Масштаб 4 одиниці viewBox
// на сантиметр, тож пропорції справжні. Декоративне: ті самі цифри є текстом поруч (список у сторінці).
const props = defineProps<{ dimensions: ProductDimensions }>()

const { t } = useI18n()
const n = useNumber()
const cm = (value: number) => t('product.cmShort', { n: n(value) })

const S = 4
const d = computed(() => {
  const { heightCm, topWidthCm, bottomWidthCm, depthCm, handleDropCm } = props.dimensions
  const top = 20 + handleDropCm * S
  const bottom = top + heightCm * S
  const cx = 154
  const topL = cx - (topWidthCm * S) / 2
  const topR = cx + (topWidthCm * S) / 2
  const botL = cx - (bottomWidthCm * S) / 2
  const botR = cx + (bottomWidthCm * S) / 2
  // Ручка кріпиться на чверті ширини від країв; кубічна крива з вершиною на y = 20
  const hL = topL + (topR - topL) * 0.25
  const hR = topR - (topR - topL) * 0.25
  const ctrl = top - (top - 20) / 0.75
  const sideL = 290
  const sideR = sideL + depthCm * S
  return { top, bottom, topL, topR, botL, botR, hL, hR, ctrl, sideL, sideR }
})
</script>

<template>
  <svg
    class="diagram"
    :viewBox="`0 0 360 ${d.bottom + 44}`"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Спереду -->
    <path class="bag" :d="`M ${d.topL} ${d.top} L ${d.topR} ${d.top} L ${d.botR} ${d.bottom} L ${d.botL} ${d.bottom} Z`" />
    <path class="handle" :d="`M ${d.hL} ${d.top} C ${d.hL} ${d.ctrl}, ${d.hR} ${d.ctrl}, ${d.hR} ${d.top}`" />

    <!-- Висота, зліва -->
    <g class="dim">
      <path :d="`M ${d.topL - 22} ${d.top} V ${d.bottom} M ${d.topL - 27} ${d.top} h 10 M ${d.topL - 27} ${d.bottom} h 10`" />
    </g>
    <text class="label" :x="d.topL - 32" :y="(d.top + d.bottom) / 2 + 4" text-anchor="end">{{ cm(dimensions.heightCm) }}</text>

    <!-- Висота ручок, справа -->
    <g class="dim">
      <path :d="`M ${d.topR + 14} 20 V ${d.top} M ${d.topR + 9} 20 h 10`" />
    </g>
    <text class="label" :x="d.topR + 22" :y="(20 + d.top) / 2 + 4">{{ cm(dimensions.handleDropCm) }}</text>

    <!-- Ширина зверху, над сумкою -->
    <g class="dim">
      <path :d="`M ${d.topL} ${d.top - 10} H ${d.topR} M ${d.topL} ${d.top - 15} v 10 M ${d.topR} ${d.top - 15} v 10`" />
    </g>
    <text class="label" :x="d.topR + 22" :y="d.top - 6">{{ cm(dimensions.topWidthCm) }}</text>

    <!-- Ширина знизу, під сумкою -->
    <g class="dim">
      <path :d="`M ${d.botL} ${d.bottom + 14} H ${d.botR} M ${d.botL} ${d.bottom + 9} v 10 M ${d.botR} ${d.bottom + 9} v 10`" />
    </g>
    <text class="label" :x="(d.botL + d.botR) / 2" :y="d.bottom + 34" text-anchor="middle">{{ cm(dimensions.bottomWidthCm) }}</text>

    <!-- Збоку: глибина -->
    <rect class="bag" :x="d.sideL" :y="d.top" :width="d.sideR - d.sideL" :height="d.bottom - d.top" />
    <g class="dim">
      <path :d="`M ${d.sideL} ${d.bottom + 14} H ${d.sideR} M ${d.sideL} ${d.bottom + 9} v 10 M ${d.sideR} ${d.bottom + 9} v 10`" />
    </g>
    <text class="label" :x="(d.sideL + d.sideR) / 2" :y="d.bottom + 34" text-anchor="middle">{{ cm(dimensions.depthCm) }}</text>
  </svg>
</template>

<style scoped>
.diagram {
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
}
.bag {
  fill: var(--paper-deep);
  stroke: var(--ink-soft);
  stroke-width: 1.5;
  stroke-linejoin: round;
}
.handle {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 3;
  stroke-linecap: round;
}
.dim path {
  fill: none;
  stroke: var(--muted);
  stroke-width: 1;
}
.label {
  font: 500 12px var(--font-body);
  fill: var(--ink);
}
</style>
