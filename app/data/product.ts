// Тимчасова демо-сторінка товару, поки немає Shopify: будь-який handle показує цю сумку (useProduct у
// useCatalog.ts). Дані й фото з лістингу клієнтки на Etsy (Studded Laptop Tote); фото лише коньячної й чорної.
// Тип ProductDetail — у shared/types/catalog.ts.
import type { ProductDetail, ProductImage } from '#shared/types/catalog'

const dir = '/images/products/studded-laptop-tote'
const photo = (file: string, alt: string): ProductImage => ({ url: `${dir}/${file}.jpg`, alt })

export const demoProduct: ProductDetail = {
  handle: 'studded-laptop-tote',
  title: 'Studded Laptop Tote',
  description:
    'A structured Crazy Horse tote that fits a 14 inch laptop. Carry it by the handles, on the shoulder or crossbody with the adjustable strap.',
  price: { amount: 102, currencyCode: 'USD' },
  colors: ['cognac', 'black', 'chocolate', 'burgundy', 'green', 'caramel', 'red'],
  defaultColor: 'cognac',
  images: {
    cognac: [
      photo('cognac-1-front', 'Cognac studded leather tote held in front, with the crossbody strap'),
      photo('cognac-2-laptop', 'A laptop slipped into the cognac tote'),
      photo('cognac-3-side', 'Cognac tote worn on the shoulder, side view'),
      photo('cognac-4-strap', 'Adjusting the studded leather strap'),
      photo('cognac-5-inside', 'Inside the cognac tote: two slip pockets and a key clip'),
      photo('cognac-6-back', 'Back of the cognac tote with the outer pocket'),
    ],
    black: [
      photo('black-1-front', 'Black studded leather tote held in front'),
      photo('black-2-handles', 'Black tote held by its studded handles'),
      photo('black-3-shoulder', 'Black tote on the shoulder with the long strap'),
      photo('black-4-side', 'Black tote worn on the shoulder, side view'),
      photo('black-5-crossbody', 'Black tote worn crossbody'),
    ],
  },
  details: [
    'Crazy Horse leather, cut and stitched by hand in Ukraine',
    'Zip top closure',
    'Two slip pockets inside, 13 × 13 cm each',
    'Key holder with a clip',
    'Studded handles, brass or silver hardware',
  ],
  dimensions: {
    heightCm: 32,
    topWidthCm: 32,
    bottomWidthCm: 23,
    depthCm: 12,
    handleDropCm: 27,
    strapCm: [53, 68],
    laptopInches: 14,
  },
  category: { handle: 'laptop-work', labelKey: 'category.laptopWork' },
}
