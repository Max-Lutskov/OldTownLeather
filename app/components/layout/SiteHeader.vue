<script setup lang="ts">
import { mainNav } from '~/data/navigation'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const otherLocale = computed(() => (locale.value === 'en' ? 'ua' : 'en'))

// Мобільне меню: у демо бургер без дії, тут він відкриває бокову панель (MobileMenu).
const menuOpen = ref(false)
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <div class="left">
        <button
          type="button"
          class="icon-btn burger"
          :aria-label="t('header.menu')"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = true"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <nav :aria-label="t('nav.label')" class="nav">
          <NuxtLink v-for="item in mainNav" :key="item.key" :to="localePath(item.to)">
            {{ t(item.key) }}
          </NuxtLink>
        </nav>
      </div>

      <NuxtLink :to="localePath('/')" class="brand" :aria-label="t('header.home')">
        <span class="brand-mark">OTL</span>
        <span class="brand-name">Old Town Leather</span>
      </NuxtLink>

      <div class="actions">
        <NuxtLink
          :to="switchLocalePath(otherLocale)"
          class="lang extra"
          :lang="otherLocale === 'ua' ? 'uk' : 'en'"
          :aria-label="t('header.switchLanguage')"
        >
          EN / UA
        </NuxtLink>
        <button type="button" class="icon-btn" :aria-label="t('header.search')">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        </button>
        <button type="button" class="icon-btn extra" :aria-label="t('header.account')">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
        </button>
        <!-- TODO: відкривати кошик-drawer (Shopify Cart API) -->
        <button type="button" class="icon-btn" :aria-label="t('header.cart', { count: 0 })">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 12H6.2L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
        </button>
      </div>
    </div>
    <LayoutMobileMenu :open="menuOpen" :items="mainNav" @close="menuOpen = false" />
  </header>
</template>

<style scoped>
.site-header {
  position: relative;
  border-bottom: 1px solid var(--line);
  background: var(--paper);
}
.bar {
  padding-top: 14px;
  padding-bottom: 14px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 16px;
}
.left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
  font-size: 15px;
  font-weight: 500;
}
.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}
.brand-mark {
  font-family: var(--font-display);
  font-stretch: var(--display-stretch);
  font-size: 38px;
  line-height: 1;
  letter-spacing: 0.04em;
}
.brand-name {
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--muted);
}
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}
.lang {
  display: inline-flex;
  align-items: center;
  font: 600 13px var(--font-body);
  border: 1px solid var(--line);
  border-radius: 999px;
  min-height: var(--tap);
  padding: 0 16px;
  box-sizing: border-box;
}
.icon-btn {
  width: var(--tap);
  height: var(--tap);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 0;
  color: var(--ink);
  cursor: pointer;
}
.icon-btn:hover {
  color: var(--accent);
}
.burger {
  display: none;
}

@media (max-width: 760px) {
  .bar {
    padding: 12px 16px;
  }
  .burger {
    display: flex;
  }
  .extra {
    display: none;
  }
  .nav {
    display: none;
  }
}
</style>
