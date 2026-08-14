import { useState } from "react";
import type { Lead, LeadDraft, Stage } from "../lib/types";
import { STAGE_ORDER } from "../lib/types";
import { getDictionary, type Locale } from "../lib/i18n";

interface LeadModalProps {
  locale: Locale;
  editingLead: Lead | null;
  defaultStage: Stage;
  onSave: (draft: LeadDraft, id: string | null) => void;
  onClose: () => void;
}

export function LeadModal({ locale, editingLead, defaultStage, onSave, onClose }: LeadModalProps) {
  const t = getDictionary(locale);
  const [name, setName] = useState(editingLead?.name ?? "");
  const [company, setCompany] = useState(editingLead?.company ?? "");
  const [value, setValue] = useState(String(editingLead?.value ?? ""));
  const [notes, setNotes] = useState(editingLead?.notes ?? "");
  const [stage, setStage] = useState<Stage>(editingLead?.stage ?? defaultStage);
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    onSave(
      {
        name: name.trim(),
        company: company.trim(),
        value: Number(value) || 0,
        notes: notes.trim(),
        stage,
      },
      editingLead?.id ?? null,
    );
  }

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-glass-border-strong bg-bg-elevated p-6 shadow-lifted"
      >
        <p className="font-display text-lg font-semibold text-ink">
          {editingLead ? t.modal.editTitle : t.modal.addTitle}
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted">{t.modal.nameLabel}</span>
            <input
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError(false);
              }}
              placeholder={t.modal.namePlaceholder}
              className="rounded-xl border border-glass-border bg-bg-elevated px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
            />
            {error && <span className="text-xs text-accent-text">{t.modal.nameRequired}</span>}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted">{t.modal.companyLabel}</span>
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder={t.modal.companyPlaceholder}
              className="rounded-xl border border-glass-border bg-bg-elevated px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-muted">{t.modal.valueLabel}</span>
              <input
                type="number"
                min="0"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={t.modal.valuePlaceholder}
                className="rounded-xl border border-glass-border bg-bg-elevated px-3 py-2 font-mono text-sm text-ink outline-none transition-colors focus:border-accent"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-muted">{t.modal.stageLabel}</span>
              <select
                value={stage}
                onChange={(event) => setStage(event.target.value as Stage)}
                className="rounded-xl border border-glass-border bg-bg-elevated px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
              >
                {STAGE_ORDER.map((option) => (
                  <option key={option} value={option}>
                    {t.stages[option]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted">{t.modal.notesLabel}</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={t.modal.notesPlaceholder}
              rows={3}
              className="resize-none rounded-xl border border-glass-border bg-bg-elevated px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent"
            />
          </label>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-glass-border-strong bg-glass px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-glass-strong"
          >
            {t.modal.cancelButton}
          </button>
          <button
            type="submit"
            className="rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-ink transition-transform hover:scale-105"
          >
            {t.modal.saveButton}
          </button>
        </div>
      </form>
    </div>
  );
}
