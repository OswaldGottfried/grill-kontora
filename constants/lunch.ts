export const LAUNCH_CATEGORY_ID = '18';
export const LAUNCH_CATEGORY_NAME = 'Ланчи';

export function isLunchCategory(categoryId: string): boolean {
  return categoryId === LAUNCH_CATEGORY_ID;
}

export function isLunchTime(): boolean {
  const now = new Date();
  const hour = now.getHours();

  return hour >= 12 && hour <= 16;
}
