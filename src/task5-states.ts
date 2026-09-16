// Тип состояния банковского счёта (Discriminated Union)
export type AccountState =
  | { status: "active"; balance: number }
  | { status: "frozen"; balance: number; reason: string }
  | { status: "closed"; closedAt: string };

// 1. Функция проверки возможности снятия средств
export function canWithdraw(state: AccountState): boolean {
  // Компилятор сам знает, что если status === "active", то у объекта есть balance.
  // Нам достаточно проверить метку.
  if (state.status === "active") {
    return true;
  }
  return false;
}

// 2. Функция получения описания состояния
export function getStatusMessage(state: AccountState): string {
  // Здесь используем if/else if по полю status.
  // TypeScript автоматически подскажет, какие поля доступны в каждой ветке.
  if (state.status === "active") {
    return `Счёт активен. Баланс: ${state.balance} руб.`;
  } else if (state.status === "frozen") {
    return `Счёт заморожен. Причина: ${state.reason}. Баланс: ${state.balance} руб.`;
  } else {
    // Здесь state автоматически сужается до типа { status: "closed"; closedAt: string }
    return `Счёт закрыт с ${state.closedAt}`;
  }
}

// 3. Функция заморозки счёта
export function freezeAccount(state: AccountState, reason: string): AccountState {
  // Если счёт активен — создаём новый объект с status: "frozen"
  if (state.status === "active") {
    return {
      status: "frozen",
      balance: state.balance, // сохраняем баланс
      reason: reason,         // добавляем причину
    };
  }
  // Если счёт не активен (frozen или closed) — возвращаем без изменений
  return state;
}