import type { Lead, Stage } from "../lib/types";
import { STAGE_ORDER } from "../lib/types";
import type { Locale } from "../lib/i18n";
import { Column } from "./Column";

interface BoardProps {
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

export function Board({ leads, locale, draggingId, onDragStart, onDragEnd, onDrop, onEdit, onDelete, onMove, onAdd }: BoardProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {STAGE_ORDER.map((stage) => (
        <Column
          key={stage}
          stage={stage}
          leads={leads.filter((lead) => lead.stage === stage)}
          locale={locale}
          draggingId={draggingId}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
