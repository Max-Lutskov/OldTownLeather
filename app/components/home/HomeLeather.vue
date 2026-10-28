<script setup lang="ts">
const { t } = useI18n()
const points = ['oiled', 'patina', 'colors'] as const
</script>

<template>
  <section aria-labelledby="leather-h" class="container leather">
    <div class="title-col">
      <h2 id="leather-h" class="display heading">{{ t('leather.title') }}</h2>
    </div>
    <div class="points">
      <div v-for="p in points" :key="p" class="point">
        <span class="point-title">{{ t(`leather.${p}.title`) }}</span>
        <span class="point-text">{{ t(`leather.${p}.text`) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.leather {
  padding-top: 88px;
  padding-bottom: 88px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}
.title-col {
  flex: 1 1 360px;
  min-width: 0;
}
.heading {
  font-size: clamp(38px, 4.5vw, 52px);
  line-height: 1.05;
}
.points {
  flex: 2 1 560px;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}
.point {
  flex: 1 1 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid var(--ink);
  padding-top: 18px;
}
.point-title {
  font-size: 17px;
  font-weight: 700;
}
.point-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-soft);
}

@media (max-width: 760px) {
  .leather {
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
