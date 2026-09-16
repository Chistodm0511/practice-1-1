// Определяем возможные статусы заказа
export type OrderStatus = "new" | "processing" | "shipped" | "delivered" | "cancelled";

// Карта переходов: для каждого статуса — массив статусов, в которые можно перейти
const transitions: Record<OrderStatus, OrderStatus[]> = {
  new: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [], // из delivered никуда нельзя
  cancelled: [], // из cancelled никуда нельзя
};

// 1. Функция парсинга строки в статус
// Возвращает статус, если строка валидна, иначе null
export function parseStatus(value: string): OrderStatus | null {
  // Проверяем, является ли строка одним из ключей объекта transitions
  if (value in transitions) {
    return value as OrderStatus;
  }
  return null;
}

// 2. Функция проверки возможности перехода
// Возвращает true, если переход разрешен
export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  // Получаем список доступных переходов из текущего статуса
  const allowed = transitions[from];
  // Проверяем, есть ли целевой статус в списке разрешенных
  // Также запрещаем переход в тот же самый статус
  return allowed.includes(to) && from !== to;
}

// 3. Функция получения списка следующих статусов
// Возвращает массив статусов, в которые можно перейти
export function getNextStatuses(from: OrderStatus): OrderStatus[] {
  // Просто возвращаем копию массива из карты переходов
  return [...transitions[from]];
}
// force commit