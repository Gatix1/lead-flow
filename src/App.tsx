import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SummaryBar } from "./components/SummaryBar";
import { SearchBar } from "./components/SearchBar";
import { Board } from "./components/Board";
import { LeadModal } from "./components/LeadModal";
import { Toast } from "./components/Toast";
import { createSampleLeads } from "./data/sampleData";
import { useColorScheme } from "./lib/useColorScheme";
import { useLocale, getDictionary } from "./lib/i18n";
import type { Lead, LeadDraft, Stage } from "./lib/types";

interface ModalState {
  editingLead: Lead | null;
  defaultStage: Stage;
}

interface PendingDelete {
  lead: Lead;
  index: number;
  timeoutId: ReturnType<typeof setTimeout>;
}

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { locale, setLocale, t } = useLocale();
  const [leads, setLeads] = useState<Lead[]>(createSampleLeads);
  const [query, setQuery] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);

  const filteredLeads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return leads;
    return leads.filter((lead) =>
      [lead.name, lead.company, lead.notes].some((field) => field.toLowerCase().includes(normalized)),
    );
  }, [leads, query]);

  function handleDrop(stage: Stage) {
    if (!draggingId) return;
    setLeads((prev) => prev.map((lead) => (lead.id === draggingId ? { ...lead, stage } : lead)));
    setDraggingId(null);
  }

  function handleMove(id: string, stage: Stage) {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead)));
  }

  function handleDelete(id: string) {
    const index = leads.findIndex((lead) => lead.id === id);
    if (index === -1) return;
    const lead = leads[index];

    if (pendingDelete) clearTimeout(pendingDelete.timeoutId);
    setLeads((prev) => prev.filter((item) => item.id !== id));

    const timeoutId = setTimeout(() => setPendingDelete(null), 5000);
    setPendingDelete({ lead, index, timeoutId });
  }

  function handleUndoDelete() {
    if (!pendingDelete) return;
    clearTimeout(pendingDelete.timeoutId);
    setLeads((prev) => {
      const next = [...prev];
      next.splice(pendingDelete.index, 0, pendingDelete.lead);
      return next;
    });
    setPendingDelete(null);
  }

  function handleSave(draft: LeadDraft, id: string | null) {
    if (id) {
      setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...draft } : lead)));
    } else {
      setLeads((prev) => [...prev, { ...draft, id: crypto.randomUUID() }]);
    }
    setModalState(null);
  }

  function handleReset() {
    if (!window.confirm(t.hero.resetConfirm)) return;
    setLeads(createSampleLeads());
    setQuery("");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header colorScheme={colorScheme} onToggleColorScheme={toggleColorScheme} locale={locale} onChangeLocale={setLocale} />
      <Hero locale={locale} onReset={handleReset} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 pb-16 sm:px-6">
        <SummaryBar leads={leads} locale={locale} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar locale={locale} value={query} onChange={setQuery} />
          {query.trim() && filteredLeads.length === 0 && (
            <p className="text-xs text-ink-faint">{t.search.noResults}</p>
          )}
        </div>

        <Board
          leads={filteredLeads}
          locale={locale}
          draggingId={draggingId}
          onDragStart={setDraggingId}
          onDragEnd={() => setDraggingId(null)}
          onDrop={handleDrop}
          onEdit={(lead) => setModalState({ editingLead: lead, defaultStage: lead.stage })}
          onDelete={handleDelete}
          onMove={handleMove}
          onAdd={(stage) => setModalState({ editingLead: null, defaultStage: stage })}
        />
      </main>

      <footer className="border-t border-glass-border px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-6xl text-center text-[11px] text-ink-faint">{getDictionary(locale).footer.disclaimer}</p>
      </footer>

      {modalState && (
        <LeadModal
          locale={locale}
          editingLead={modalState.editingLead}
          defaultStage={modalState.defaultStage}
          onSave={handleSave}
          onClose={() => setModalState(null)}
        />
      )}

      {pendingDelete && <Toast message={t.toast.deleted} actionLabel={t.toast.undo} onAction={handleUndoDelete} />}
    </div>
  );
}
