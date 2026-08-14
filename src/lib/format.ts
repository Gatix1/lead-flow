import { numberLocale, type Locale } from "./i18n";

export function formatCurrency(value: number, locale: Locale): string {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
