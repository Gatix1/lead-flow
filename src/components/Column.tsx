import { useState } from "react";
import clsx from "clsx";
import type { Lead, Stage } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { getDictionary, type Locale } from "../lib/i18n";
import { LeadCard } from "./LeadCard";

interface ColumnProps {
  stage: Stage;
  leads: Lead[];
  locale: Locale;
  draggingId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (stage: Stage) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, stage: Stage) => void;
  onAdd: (stage: Stage) => void;
}

const STAGE_DOT: Record<Stage, string> = {
  new: "bg-accent-text",
  contacted: "bg-accent-text",
  proposal: "bg-accent-text",
  won: "bg-stage-won",
  lost: "bg-stage-lost",
};

export function Column({
  stage,
  leads,
  locale,
  draggingId,
  onDragStart,
  onDragEnd,
  onDrop,
  onEdit,
  onDelete,
  onMove,
  onAdd,
}: ColumnProps) {
  const t = getDictionary(locale);
  const [isDropTarget, setIsDropTarget] = useState(false);
  const total = leads.reduce((sum, lead) => sum + lead.value, 0);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDropTarget(true);
      }}
      onDragLeave={() => setIsDropTarget(false)}
      onDrop={() => {
        setIsDropTarget(false);
        onDrop(stage);
      }}
      className={clsx(
        "flex min-h-[240px] flex-col gap-3 rounded-3xl border border-glass-border bg-glass p-3 backdrop-blur-xl transition-colors",
        isDropTarget && "column-drop-target",
      )}
    >
      <div className="flex items-center justify-between gap-2 px-1 pt-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", STAGE_DOT[stage])} />
          <p className="truncate font-display text-sm font-semibold text-ink">{t.stages[stage]}</p>
        </div>
        <p className="shrink-0 font-mono text-[11px] text-ink-faint">{t.board.leadsCount(leads.length)}</p>
      </div>

      {total > 0 && (
        <p className="px-1 font-mono text-[11px] font-medium text-ink-muted">{formatCurrency(total, locale)}</p>
      )}

      <div className="flex flex-1 flex-col gap-2">
        {leads.length === 0 && (
          <p className="rounded-2xl border border-dashed border-glass-border-strong p-4 text-center text-[11px] text-ink-faint">
            {t.board.emptyColumn}
          </p>
        )}
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            locale={locale}
            isDragging={draggingId === lead.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={onEdit}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>

      <button
        onClick={() => onAdd(stage)}
        className="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-glass-border-strong py-2 text-[11px] font-medium text-ink-faint transition-colors hover:border-glass-border-strong hover:bg-glass-strong hover:text-ink-muted"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {t.board.addLead}
      </button>
    </div>
  );
}
