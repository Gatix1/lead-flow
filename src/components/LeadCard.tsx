import clsx from "clsx";
import type { Lead, Stage } from "../lib/types";
import { STAGE_ORDER } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { getDictionary, type Locale } from "../lib/i18n";

interface LeadCardProps {
  lead: Lead;
  locale: Locale;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, stage: Stage) => void;
}

export function LeadCard({ lead, locale, isDragging, onDragStart, onDragEnd, onEdit, onDelete, onMove }: LeadCardProps) {
  const t = getDictionary(locale);

  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", lead.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(lead.id);
      }}
      onDragEnd={onDragEnd}
      className={clsx(
        "group flex flex-col gap-2 rounded-2xl border border-glass-border bg-glass-strong p-3 shadow-ambient backdrop-blur-xl transition-all",
        "cursor-grab active:cursor-grabbing",
        isDragging && "card-dragging",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-ink">{lead.name}</p>
          <p className="truncate text-xs text-ink-muted">{lead.company}</p>
        </div>
        <p className="shrink-0 font-mono text-[12px] font-semibold text-accent-text">
          {formatCurrency(lead.value, locale)}
        </p>
      </div>

      {lead.notes && <p className="line-clamp-2 text-[11px] leading-relaxed text-ink-faint">{lead.notes}</p>}

      <div className="mt-1 flex items-center justify-between gap-2">
        <select
          aria-label={t.card.moveLabel}
          value={lead.stage}
          onChange={(event) => onMove(lead.id, event.target.value as Stage)}
          className="rounded-lg border border-glass-border bg-glass px-1.5 py-1 text-[11px] text-ink-muted outline-none transition-colors hover:border-glass-border-strong"
        >
          {STAGE_ORDER.map((stage) => (
            <option key={stage} value={stage}>
              {t.stages[stage]}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            onClick={() => onEdit(lead)}
            aria-label={t.card.editLabel}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-glass hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            aria-label={t.card.deleteLabel}
            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-glass hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
              <path d="M3 6h18" />
              <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0-1 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
