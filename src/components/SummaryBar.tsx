import type { Lead } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { getDictionary, type Locale } from "../lib/i18n";

interface SummaryBarProps {
  leads: Lead[];
  locale: Locale;
}

export function SummaryBar({ leads, locale }: SummaryBarProps) {
  const t = getDictionary(locale);

  const activeValue = leads
    .filter((lead) => lead.stage === "new" || lead.stage === "contacted" || lead.stage === "proposal")
    .reduce((sum, lead) => sum + lead.value, 0);

  const won = leads.filter((lead) => lead.stage === "won").length;
  const lost = leads.filter((lead) => lead.stage === "lost").length;
  const closed = won + lost;
  const winRate = closed === 0 ? null : Math.round((won / closed) * 100);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-2xl border border-glass-border bg-glass p-3 backdrop-blur-xl">
        <p className="font-mono text-lg font-semibold text-ink sm:text-xl">{leads.length}</p>
        <p className="mt-0.5 text-[11px] text-ink-faint">{t.summary.totalLeads(leads.length)}</p>
      </div>
      <div className="rounded-2xl border border-glass-border bg-glass p-3 backdrop-blur-xl">
        <p className="font-mono text-lg font-semibold text-ink sm:text-xl">{formatCurrency(activeValue, locale)}</p>
        <p className="mt-0.5 text-[11px] text-ink-faint">{t.summary.pipelineValue}</p>
      </div>
      <div className="rounded-2xl border border-glass-border bg-glass p-3 backdrop-blur-xl">
        <p className="font-mono text-lg font-semibold text-ink sm:text-xl">{winRate === null ? "—" : `${winRate}%`}</p>
        <p className="mt-0.5 text-[11px] text-ink-faint">{t.summary.winRate}</p>
      </div>
    </div>
  );
}
