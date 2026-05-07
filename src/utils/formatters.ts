// Chinese number to Arabic number
const CHINESE_NUMBERS: Record<string, number> = {
  '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
  '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
  '十': 10, '百': 100, '千': 1000, '万': 10000,
  '元': 0, '块': 0, '块钱': 0
};

export function parseChineseNumber(text: string): number | null {
  // Extract amount from text like "花了100块" or "消费了50元"
  const amountMatch = text.match(/(\d+\.?\d*)/);
  if (amountMatch) {
    return parseFloat(amountMatch[1]);
  }

  // Try to parse Chinese numbers
  let result = 0;
  let temp = 0;
  const textWithoutSpaces = text.replace(/\s/g, '');

  for (let i = 0; i < textWithoutSpaces.length; i++) {
    const char = textWithoutSpaces[i];
    if (char === '万') {
      temp = temp === 0 ? 1 : temp;
      result += temp * 10000;
      temp = 0;
    } else if (char === '千') {
      temp = temp === 0 ? 1 : temp;
      result += temp * 1000;
      temp = 0;
    } else if (char === '百') {
      temp = temp === 0 ? 1 : temp;
      result += temp * 100;
      temp = 0;
    } else if (char === '十') {
      temp = temp === 0 ? 1 : temp;
      result += temp * 10;
      temp = 0;
    } else if (CHINESE_NUMBERS[char] !== undefined) {
      temp = temp * 10 + CHINESE_NUMBERS[char];
    } else if (char >= '0' && char <= '9') {
      temp = temp * 10 + parseInt(char);
    }
  }

  result += temp;
  return result > 0 ? result : null;
}

export function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return `今天 ${formatTime(date)}`;
  } else if (days === 1) {
    return `昨天 ${formatTime(date)}`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
}

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatCurrency(amount: number): string {
  return `¥${amount.toFixed(2)}`;
}

export function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}万`;
  }
  return amount.toFixed(0);
}

export function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return getDateKey(date1) === getDateKey(date2);
}

export function isSameMonth(date1: Date, date2: Date): boolean {
  return getMonthKey(date1) === getMonthKey(date2);
}
