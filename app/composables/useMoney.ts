import type { Money } from '#shared/types/catalog'

// Код локалі в URL "ua", а для Intl потрібен мовний тег "uk-UA".
function useIntlLocale() {
  const { locale } = useI18n()
  return () => (locale.value === 'ua' ? 'uk-UA' : 'en-US')
}

// Формат ціни як у демо: $102, $93.50 (без копійок, якщо ціна ціла).
export function useMoney() {
  const intlLocale = useIntlLocale()

  return (money: Money) => {
    const whole = Number.isInteger(money.amount)
    return new Intl.NumberFormat(intlLocale(), {
      style: 'currency',
      currency: money.currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(money.amount)
  }
}

// Числа: 2,566 / 2 566, 4.9 / 4,9.
export function useNumber() {
  const intlLocale = useIntlLocale()
  return (value: number) => new Intl.NumberFormat(intlLocale()).format(value)
}
