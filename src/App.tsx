import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Board } from "./components/Board";
import { LeadModal } from "./components/LeadModal";
import { createSampleLeads } from "./data/sampleData";
import { useColorScheme } from "./lib/useColorScheme";
import { useLocale, getDictionary } from "./lib/i18n";
import type { Lead, LeadDraft, Stage } from "./lib/types";

interface ModalState {
  editingLead: Lead | null;
  defaultStage: Stage;
}

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { locale, setLocale, t } = useLocale();
  const [leads, setLeads] = useState<Lead[]>(createSampleLeads);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  function handleDrop(stage: Stage) {
    if (!draggingId) return;
    setLeads((prev) => prev.map((lead) => (lead.id === draggingId ? { ...lead, stage } : lead)));
    setDraggingId(null);
  }

  function handleMove(id: string, stage: Stage) {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead)));
  }

  function handleDelete(id: string) {
    if (!window.confirm(t.card.deleteConfirm)) return;
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
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
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header colorScheme={colorScheme} onToggleColorScheme={toggleColorScheme} locale={locale} onChangeLocale={setLocale} />
      <Hero locale={locale} onReset={handleReset} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
        <Board
          leads={leads}
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
    </div>
  );
}
