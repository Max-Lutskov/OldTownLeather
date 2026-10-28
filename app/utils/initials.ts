// Правило для ініціалів на шкірі (і для атрибута кошика Initials): до 3 літер, латиниця A–Z
// або українська абетка, верхній регістр. Решту символів відкидаємо.
const NOT_ALLOWED = /[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії]/g

export const MAX_INITIALS = 3

export function cleanInitials(value: string): string {
  return value.replace(NOT_ALLOWED, '').slice(0, MAX_INITIALS).toUpperCase()
}
