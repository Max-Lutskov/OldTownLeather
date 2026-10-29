<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Якщо категорії не завантажились або їх немає, секцію просто не показуємо.
const { data: categories } = await useHomeCategories()
</script>

<template>
  <section v-if="categories.length" aria-labelledby="cat-h" class="container categories">
    <h2 id="cat-h" class="display heading">{{ t('home.categoriesTitle') }}</h2>
    <div class="grid">
      <NuxtLink
        v-for="c in categories"
        :key="c.handle"
        :to="localePath(`/collections/${c.handle}`)"
        class="card"
      >
        <div class="photo">
          <img :src="publicPath(c.image)" alt="" loading="lazy">
        </div>
        <span class="label">{{ t(c.labelKey) }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.categories {
  padding-top: 32px;
  padding-bottom: 72px;
}
.heading {
  margin-bottom: 28px;
  font-size: 44px;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 240px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.photo {
  height: 340px;
}
.label {
  font-size: 17px;
  font-weight: 600;
}

@media (max-width: 760px) {
  .heading {
    font-size: 34px;
    line-height: 1.08;
    margin-bottom: 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
  }
  .photo {
    height: 220px;
  }
}
</style>
