// Шар даних каталогу. Компоненти беруть товари й категорії лише звідси, а не з ~/data/catalog напряму.
// Поки джерело — тимчасові дані. При підключенні Shopify міняється тільки тіло цих функцій
// (запит до server/api або Storefront API), а ключі, форма даних і компоненти лишаються.
import { bestsellers, homeCategories } from '~/data/catalog'
import { demoProduct } from '~/data/product'

export function useHomeCategories() {
  return useAsyncData('catalog:home-categories', () => Promise.resolve(homeCategories), {
    default: () => [],
  })
}

export function useBestsellers() {
  return useAsyncData('catalog:bestsellers', () => Promise.resolve(bestsellers), {
    default: () => [],
  })
}

// Сторінка товару. Поки для будь-якого handle демо-сумка (data/product.ts); з Shopify — запит за handle.
export function useProduct(handle: string) {
  return useAsyncData(`catalog:product:${handle}`, () => Promise.resolve(demoProduct))
}
