import { ColorSchemeToggle } from "./ColorSchemeToggle";
import { LangSwitch } from "./LangSwitch";
import type { ColorScheme } from "../lib/colorScheme";
import type { Locale } from "../lib/i18n";
import { getDictionary } from "../lib/i18n";

interface HeaderProps {
  colorScheme: ColorScheme;
  onToggleColorScheme: () => void;
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
}

export function Header({ colorScheme, onToggleColorScheme, locale, onChangeLocale }: HeaderProps) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-20 border-b border-glass-border bg-glass-strong backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-accent-soft text-accent-text">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-none stroke-current stroke-[1.8]">
              <rect x="3" y="4" width="6" height="16" rx="1.2" />
              <rect x="9.5" y="4" width="6" height="10" rx="1.2" />
              <rect x="16" y="4" width="5" height="13" rx="1.2" />
            </svg>
          </div>
          <div>
            <p className="font-display text-base font-semibold leading-none">{t.header.name}</p>
            <p className="mt-1 text-xs text-ink-faint">{t.header.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://mpintea.dev"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-ink-faint transition-colors hover:text-ink-muted sm:block"
          >
            {t.header.byLine}
          </a>
          <LangSwitch locale={locale} onChange={onChangeLocale} label={t.langSwitch.label} />
          <ColorSchemeToggle colorScheme={colorScheme} onToggle={onToggleColorScheme} labels={t.themeToggle} />
        </div>
      </div>
    </header>
  );
}
