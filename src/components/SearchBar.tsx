import type { Locale } from "../lib/i18n";
import { getDictionary } from "../lib/i18n";

interface SearchBarProps {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ locale, value, onChange }: SearchBarProps) {
  const t = getDictionary(locale);

  return (
    <div className="relative flex-1 sm:max-w-xs">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 fill-none stroke-ink-faint stroke-[1.8]"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.search.placeholder}
        className="w-full rounded-full border border-glass-border bg-glass py-2 pl-9 pr-3 text-xs text-ink outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
