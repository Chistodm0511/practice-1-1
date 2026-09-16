export function calculateDiscount(price: number, discount: number): number {
  return price - discount;
}

export function formatGreeting(name: string, isFormal: boolean): string {
  if (isFormal) {
    return "Добрый день, " + name;
  }
  return "Привет, " + name;
}

export function repeatText(text: string, count: number): string {
  return text.repeat(count);
}