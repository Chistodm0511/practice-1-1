// Определяем тип для валют (Union type)
export type Currency = "RUB" | "USD" | "EUR";

// Функция конвертации
export function convert(amount: number, from: Currency, to: Currency): number {
  // Если валюты одинаковые, возвращаем то же число
  if (from === to) {
    return amount;
  }

  // Сначала переводим всё в RUB (базовая валюта), потом из RUB в целевую
  let amountInRub = amount;

  // Шаг 1: Перевод из исходной валюты в RUB
  if (from === "USD") {
    amountInRub = amount * 90;
  } else if (from === "EUR") {
    amountInRub = amount * 100;
  }
  // Если from === "RUB", то amountInRub уже равен amount

  // Шаг 2: Перевод из RUB в целевую валюту
  if (to === "USD") {
    return amountInRub / 90;
  } else if (to === "EUR") {
    return amountInRub / 100;
  }

  // Если to === "RUB"
  return amountInRub;
}

// Функция форматирования
export function formatCurrency(amount: number, currency: Currency): string {
  return `${amount} ${currency}`;
}