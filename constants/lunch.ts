export const LAUNCH_CATEGORY_ID = '8';
export const LAUNCH_CATEGORY_NAME = 'Шаурма & Бургеры';

export function isLunchCategory(categoryId: string): boolean {
  return categoryId === LAUNCH_CATEGORY_ID;
}

export function isLunchTime(): boolean {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 12 && hour <= 16;
}
