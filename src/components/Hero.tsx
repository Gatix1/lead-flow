import type { Locale } from "../lib/i18n";
import { getDictionary } from "../lib/i18n";

interface HeroProps {
  locale: Locale;
  onReset: () => void;
}

export function Hero({ locale, onReset }: HeroProps) {
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-6 sm:px-6 sm:pt-14">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.hero.heading}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{t.hero.subhead}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-glass-border bg-glass p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-faint sm:max-w-xl">{t.hero.metaNote}</p>
        <button
          onClick={onReset}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-glass-border-strong bg-glass px-4 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-glass-strong"
        >
          {t.hero.resetButton}
        </button>
      </div>
    </section>
  );
}
