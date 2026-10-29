<script setup lang="ts">
// Розворот про шкіру: велике фото деталі зліва, заголовок і два менші фото справа.
// Підписи як у журналі: короткий заголовок шрифтом заголовків і один рядок пояснення.
const { t } = useI18n()
const details = [
  { key: 'pockets', image: '/images/detail-pockets.jpg' },
  { key: 'patina', image: '/images/detail-flap.jpg' },
] as const
</script>

<template>
  <section aria-labelledby="leather-h" class="container leather">
    <figure v-reveal class="lead-fig">
      <div class="photo lead-photo">
        <NuxtImg src="/images/detail-hardware.jpg" :alt="t('leather.hardware.alt')" preset="photo" sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:700px" loading="lazy" />
      </div>
      <figcaption class="lead-cap">
        <span class="display cap-title lead-title">{{ t('leather.hardware.title') }}</span>
        <span class="cap-text lead-text">{{ t('leather.hardware.text') }}</span>
      </figcaption>
    </figure>

    <div class="side">
      <div v-reveal="1" class="copy">
        <h2 id="leather-h" class="display heading">{{ t('leather.title') }}</h2>
        <p class="lead">{{ t('leather.lead') }}</p>
      </div>
      <div class="details">
        <figure v-for="(d, i) in details" :key="d.key" v-reveal="i + 1" class="detail">
          <div class="photo detail-photo">
            <NuxtImg :src="d.image" :alt="t(`leather.${d.key}.alt`)" preset="photo" sizes="xs:50vw sm:50vw md:50vw lg:50vw xl:260px" loading="lazy" />
          </div>
          <figcaption class="detail-cap">
            <span class="display cap-title">{{ t(`leather.${d.key}.title`) }}</span>
            <span class="cap-text">{{ t(`leather.${d.key}.text`) }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.leather {
  padding-top: 144px;
  padding-bottom: 136px;
  display: flex;
  flex-wrap: wrap;
  gap: 48px 72px;
  align-items: stretch;
}
.lead-fig {
  flex: 7 1 520px;
  min-width: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.lead-photo {
  flex: 1 1 auto;
  min-height: 640px;
}
.lead-photo img {
  object-position: 50% 25%;
}
.lead-cap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  align-items: baseline;
  justify-content: space-between;
  border-top: 1px solid var(--line-strong);
  padding-top: 14px;
}
.cap-title {
  font-size: 24px;
  line-height: 1.15;
  color: var(--ink);
}
.lead-title {
  font-size: 28px;
}
.cap-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
}
.lead-text {
  max-width: 36ch;
}
.side {
  flex: 5 1 380px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 56px;
}
.copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 8px;
}
.heading {
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1;
}
.lead {
  margin: 0;
  font-size: 18px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 36ch;
}
.details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}
.detail {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.detail-photo {
  aspect-ratio: 4 / 5;
}
.detail-cap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 760px) {
  .leather {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 28px;
  }
  .lead-photo {
    min-height: 420px;
  }
  .heading {
    font-size: 34px;
    line-height: 1.08;
  }
  .lead {
    font-size: 17px;
  }
  .details {
    gap: 12px;
  }
  .cap-title {
    font-size: 21px;
  }
}
</style>
