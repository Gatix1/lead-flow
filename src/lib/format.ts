import { numberLocale, type Locale } from "./i18n";

export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocale(locale), {
    day: "numeric",
    month: "short",
  }).format(new Date(`${isoDate}T00:00:00`));
}

export function isOverdue(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${isoDate}T00:00:00`) < today;
}
