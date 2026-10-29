<script setup lang="ts">
// Фішка сайту: ініціали з CSS-тисненням на фото кишені. Лише на головній, на сторінці товару не ставити.
const { t, locale } = useI18n()

// Приклад ініціалів: на UA кирилицею, щоб було видно, що українські літери теж можна.
const DEFAULT_INITIALS = computed(() => (locale.value === 'ua' ? 'ВК' : 'VK'))
const input = ref('')

// Ті самі правила, що й для атрибута кошика Initials (utils/initials.ts).
function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  const clean = cleanInitials(el.value)
  el.value = clean
  input.value = clean
}

const monogram = computed(() => (input.value || DEFAULT_INITIALS.value).split('').join('.') + '.')
</script>

<template>
  <section id="personal" aria-labelledby="pers-h" class="personal on-dark">
    <div class="container inner">
      <div class="copy">
        <h2 id="pers-h" class="display heading">
          <template v-for="(line, i) in t('personal.title').split('\n')" :key="i">
            <br v-if="i">{{ line }}
          </template>
        </h2>
        <p class="lead">{{ t('personal.lead') }}</p>
        <ol class="steps">
          <li v-for="i in 3" :key="i">
            <span class="display step-num">0{{ i }}</span>
            <span>{{ t(`personal.step${i}`) }}</span>
          </li>
        </ol>
      </div>

      <div class="demo">
        <div class="leather">
          <img :src="publicPath('/images/leather-pocket.jpg')" :alt="t('personal.alt')" loading="lazy">
          <LeatherDeboss :text="monogram" announce />
        </div>
        <div class="try">
          <label for="try-ini">{{ t('personal.try') }}</label>
          <input
            id="try-ini"
            type="text"
            inputmode="text"
            autocomplete="off"
            maxlength="3"
            :placeholder="DEFAULT_INITIALS"
            @input="onInput"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner {
  padding-top: 88px;
  padding-bottom: 88px;
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  align-items: center;
}
.copy {
  flex: 1 1 460px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.heading {
  font-size: clamp(40px, 5vw, 60px);
  line-height: 1.02;
}
.lead {
  margin: 0;
  font-size: 17px;
  line-height: 1.65;
  color: var(--on-dark-soft);
  max-width: 480px;
}
.steps {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 40px;
}
.steps li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
}
.step-num {
  font-size: 32px;
  color: var(--accent-on-dark);
}
.demo {
  flex: 1 1 420px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.leather {
  aspect-ratio: 1200 / 1050;
  position: relative;
  overflow: hidden;
  background: var(--leather-fallback);
}
.leather img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.try {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
.try label {
  font-size: 14px;
  color: var(--on-dark-soft);
}
.try input {
  flex: 0 1 160px;
  min-height: var(--input-h);
  padding: 0 14px;
  border: 1px solid var(--muted);
  border-radius: var(--radius);
  background: transparent;
  color: var(--on-dark);
  font: 600 18px var(--font-body);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  box-sizing: border-box;
}

@media (max-width: 760px) {
  .inner {
    padding-top: 56px;
    padding-bottom: 56px;
    gap: 28px;
  }
  .heading {
    font-size: 34px;
    line-height: 1.08;
  }
  .demo {
    order: -1;
  }
}
</style>
