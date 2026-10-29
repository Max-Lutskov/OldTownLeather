import type { Directive } from 'vue'

// v-reveal: блок м'яко піднімається й проявляється, коли доходить до екрана. Значення — номер у ряду
// (v-reveal="i"), від нього затримка, щоб картки з'являлись по черзі. Стан у data-reveal, а не в class,
// щоб Vue його не перезаписав. Ховаємо лише те, що нижче екрана: без JS, з prefers-reduced-motion
// або для блоків, які вже видно при завантаженні, нічого не змінюється. Стилі — у main.css.
const STAGGER_MS = 80

let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.reveal = 'in'
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  )
  return observer
}

const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    if (value) el.style.setProperty('--reveal-delay', `${value * STAGGER_MS}ms`)
    el.dataset.reveal = 'hidden'
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
  getSSRProps: () => ({}),
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
