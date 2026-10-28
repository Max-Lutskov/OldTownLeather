<script setup lang="ts">
import { etsy } from '~/data/brand'
import { bestsellers } from '~/data/catalog'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="shop" aria-labelledby="best-h" class="bestsellers">
    <div class="container inner">
      <div class="head">
        <h2 id="best-h" class="display heading">{{ t('home.bestsellersTitle') }}</h2>
        <NuxtLink :to="localePath('/collections/all')" class="text-link">
          {{ t('home.viewAll', { count: etsy.designs }) }}
        </NuxtLink>
      </div>
      <div class="grid">
        <ProductCard v-for="p in bestsellers" :key="p.handle" :product="p" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bestsellers {
  background: var(--paper-deep);
}
.inner {
  padding-top: 72px;
  padding-bottom: 72px;
}
.head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 32px;
}
.heading {
  font-size: 44px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

@media (max-width: 760px) {
  .inner {
    padding-top: 56px;
    padding-bottom: 56px;
  }
  .heading {
    font-size: 34px;
    line-height: 1.08;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
  }
}
</style>
