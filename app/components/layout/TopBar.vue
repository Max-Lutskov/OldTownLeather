<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="top-bar on-dark">
    <span>{{ t('topBar.handmade') }}</span>
    <span class="extra">{{ t('topBar.shipping') }}</span>
    <span class="extra">{{ t('topBar.duties') }}</span>
  </div>
</template>

<style scoped>
.top-bar {
  font-size: 13px;
  letter-spacing: 0.04em;
  padding: 10px 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
  text-align: center;
}

@media (max-width: 760px) {
  .extra {
    display: none;
  }
}
</style>
