import { joinURL } from 'ufo'

// Шлях до файлу з public/ з урахуванням app.baseURL: на GitHub Pages сайт живе в /otl-bags/,
// і абсолютні '/images/...' без префікса там ламаються. Викликати в setup або в шаблоні.
export function publicPath(path: string): string {
  return joinURL(useRuntimeConfig().app.baseURL, path)
}
