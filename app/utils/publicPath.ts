import { joinURL } from 'ufo'

// Шлях до файлу з public/ з урахуванням app.baseURL: на GitHub Pages сайт живе в /OldTownLeather/,
// і абсолютні '/images/...' без префікса там ламаються. Викликати в setup або в шаблоні.
export function publicPath(path: string): string {
  return joinURL(useRuntimeConfig().app.baseURL, path)
}

// Повна адреса файлу з public/ (з доменом): для og:image і всього, що читають інші сайти.
// Без siteUrl лишається відносним шляхом.
export function absolutePublicUrl(path: string): string {
  return joinURL(useRuntimeConfig().public.siteUrl, publicPath(path))
}
