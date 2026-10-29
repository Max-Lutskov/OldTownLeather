<script setup lang="ts">
import { contacts, paymentMethods } from '~/data/brand'
import { footerHelpNav, footerShopNav } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="site-footer on-dark">
    <div class="container cols">
      <div class="about">
        <LogoMark class="mark" />
        <span class="tagline">{{ t('footer.tagline') }}</span>
      </div>

      <nav :aria-label="t('footer.shop')" class="col">
        <span class="col-title">{{ t('footer.shop') }}</span>
        <NuxtLink v-for="l in footerShopNav" :key="l.key" :to="localePath(l.to)">{{ t(l.key) }}</NuxtLink>
      </nav>

      <nav :aria-label="t('footer.help')" class="col">
        <span class="col-title">{{ t('footer.help') }}</span>
        <NuxtLink v-for="l in footerHelpNav" :key="l.key" :to="localePath(l.to)">{{ t(l.key) }}</NuxtLink>
      </nav>

      <div class="col">
        <span class="col-title">{{ t('footer.contact') }}</span>
        <span>{{ contacts.email ?? '[email]' }}</span>
        <span>{{ contacts.instagram ?? '[Instagram]' }}</span>
        <span>{{ contacts.phone ?? '[phone]' }}</span>
      </div>
    </div>

    <div class="container bottom">
      <span>© {{ new Date().getFullYear() }} Old Town Leather</span>
      <ul :aria-label="t('footer.payments')" class="payments">
        <li v-for="p in paymentMethods" :key="p">{{ p }}</li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  color: var(--on-dark-soft);
}
.cols {
  padding-top: 64px;
  padding-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.about {
  flex: 2 1 300px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.mark {
  width: 56px;
  height: 56px;
  color: var(--on-dark);
}
.tagline {
  font-size: 15px;
  line-height: 1.6;
  max-width: 320px;
}
.col {
  flex: 1 1 160px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
}
.col a {
  color: var(--on-dark-soft);
}
.site-footer a:hover {
  color: var(--accent-on-dark);
}
.col-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--on-dark);
  margin-bottom: 4px;
}
.bottom {
  padding-top: 20px;
  padding-bottom: 32px;
  border-top: 1px solid var(--line-on-dark);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}
.payments {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
}

@media (max-width: 760px) {
  .cols {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 28px;
  }
}
</style>
