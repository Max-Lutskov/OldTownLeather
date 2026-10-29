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

// Шапка закріплена. На мобільному при прокрутці стає нижчою (див. стилі .compact).
// Після монтування, щоб клієнт гідрував ту саму розмітку, що й сервер.
const mounted = useMounted()
const { y } = useWindowScroll()
const compact = computed(() => mounted.value && y.value > 4)
</script>

<template>
  <header class="site-header" :class="{ compact }">
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
        <LogoMark class="brand-mark" />
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
        <!-- Пошук і акаунт ведуть на свої сторінки (поки 404, як і решта ще не створених) -->
        <NuxtLink :to="localePath('/search')" class="icon-btn" :aria-label="t('header.search')">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        </NuxtLink>
        <NuxtLink :to="localePath('/account')" class="icon-btn extra" :aria-label="t('header.account')">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
        </NuxtLink>
        <!-- TODO: відкривати кошик-drawer (Shopify Cart API) -->
        <button type="button" class="icon-btn" :aria-label="t('header.cart', { count: 0 }, 0)">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 12H6.2L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
        </button>
      </div>
    </div>
    <LayoutMobileMenu :open="menuOpen" :items="mainNav" @close="menuOpen = false" />
  </header>
</template>

<style scoped>
/* Закріплена шапка. На мобільному top від'ємний: шапка спершу проїжджає --header-shrink разом зі сторінкою
   і лише тоді закріплюється, тож стає нижчою без зміни висоти і без стрибків сторінки під нею. */
.site-header {
  position: sticky;
  top: calc(-1 * var(--header-shrink));
  z-index: 50;
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
/* Монограма тієї ж висоти, що й колишній напис OTL (38px), тож висота шапки й --header-h не змінились */
.brand-mark {
  width: 38px;
  height: 38px;
}
.brand-name {
  font-size: 13px;
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

  /* Нижча шапка при прокрутці: верхні --header-shrink сховались за край екрана, тому вміст зсуваємо
     на половину вниз, щоб він стояв по центру видимої частини. Підпис зникає, лого трохи менше
     і опускається ще на половину висоти підпису з відступом (11px). Лише transform і opacity. */
  .left,
  .actions,
  .brand-mark,
  .brand-name {
    transition: transform 0.35s var(--ease-out), opacity 0.25s ease;
  }
  .compact .left,
  .compact .actions {
    transform: translateY(calc(var(--header-shrink) / 2));
  }
  .compact .brand-mark {
    transform: translateY(calc(var(--header-shrink) / 2 + 11px)) scale(0.8);
  }
  .compact .brand-name {
    opacity: 0;
    transform: translateY(calc(var(--header-shrink) / 2));
  }
}

@media (prefers-reduced-motion: reduce) {
  .left,
  .actions,
  .brand-mark,
  .brand-name {
    transition: none;
  }
}
</style>
