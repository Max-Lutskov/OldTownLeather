// Множина для української: 1 відгук, 2–4 відгуки, 5+ відгуків (11–14 теж «відгуків").
// У текстах ua.json три форми через «|», а в t() третім аргументом передається саме число (не відформатоване).
function ukrainianPlural(choice: number, choicesLength: number): number {
  if (choicesLength < 3) return choice === 1 ? 0 : 1
  const n = Math.abs(choice) % 100
  const last = n % 10
  if (n > 10 && n < 20) return 2
  if (last === 1) return 0
  if (last >= 2 && last <= 4) return 1
  return 2
}

export default defineI18nConfig(() => ({
  pluralRules: {
    ua: ukrainianPlural,
  },
}))
