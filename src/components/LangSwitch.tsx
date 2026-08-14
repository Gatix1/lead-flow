import clsx from "clsx";
import { LOCALES, type Locale } from "../lib/i18n";

interface LangSwitchProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}

export function LangSwitch({ locale, onChange, label }: LangSwitchProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full border border-glass-border-strong bg-glass p-0.5 backdrop-blur-xl"
    >
      {LOCALES.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          aria-pressed={locale === option}
          className={clsx(
            "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors",
            locale === option ? "bg-accent text-accent-ink" : "text-ink-faint hover:text-ink-muted",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
