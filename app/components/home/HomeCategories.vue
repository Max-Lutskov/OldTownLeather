<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Якщо категорії не завантажились або їх немає, секцію просто не показуємо.
const { data: categories } = await useHomeCategories()
</script>

<template>
  <section v-if="categories.length" aria-labelledby="cat-h" class="container categories">
    <h2 id="cat-h" v-reveal class="display heading">{{ t('home.categoriesTitle') }}</h2>
    <!-- Великі плитки 2×2: фото щільно по сумці, однаковий тон, назва шрифтом заголовків поверх фото -->
    <div class="grid">
      <NuxtLink
        v-for="(c, i) in categories"
        :key="c.handle"
        v-reveal="i"
        :to="localePath(`/collections/${c.handle}`)"
        class="tile photo"
      >
        <NuxtImg :src="c.image" alt="" preset="photo" sizes="xs:50vw sm:50vw md:50vw lg:50vw xl:620px" loading="lazy" />
        <span class="shade" aria-hidden="true" />
        <span class="display name">{{ t(c.labelKey) }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.categories {
  padding-top: 40px;
  padding-bottom: 88px;
}
.heading {
  margin-bottom: 28px;
  font-size: 44px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.tile {
  display: block;
  aspect-ratio: 5 / 4;
  color: var(--on-dark);
}
.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--tile-fade), var(--scrim-clear) 38%), var(--tile-wash);
}
.name {
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 24px;
  font-size: 40px;
  line-height: 1.05;
}
.tile:hover {
  color: var(--on-dark);
}
.tile:hover .name {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}
/* Лише на пристроях з мишкою: фото повільно наближається */
@media (hover: hover) and (pointer: fine) {
  .tile img {
    transition: transform 0.9s var(--ease-out);
  }
  .tile:hover img {
    transform: scale(1.04);
  }
}
@media (prefers-reduced-motion: reduce) {
  .tile img {
    transition: none;
  }
  .tile:hover img {
    transform: none;
  }
}

@media (max-width: 760px) {
  .heading {
    font-size: 34px;
    line-height: 1.08;
    margin-bottom: 20px;
  }
  .grid {
    gap: 8px;
  }
  .tile {
    aspect-ratio: 1 / 1;
  }
  .name {
    left: 14px;
    right: 14px;
    bottom: 12px;
    font-size: 19px;
  }
}
</style>
