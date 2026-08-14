import { useEffect, useState } from "react";
import type { Priority, Stage } from "./types";

export type Locale = "ro" | "ru" | "en";

export const LOCALES: Locale[] = ["ro", "ru", "en"];

const STORAGE_KEY = "lead-flow-locale";

interface Dictionary {
  header: {
    name: string;
    tagline: string;
    byLine: string;
  };
  hero: {
    heading: string;
    subhead: string;
    metaNote: string;
    resetButton: string;
    resetConfirm: string;
  };
  stages: Record<Stage, string>;
  priority: Record<Priority, string>;
  search: {
    placeholder: string;
    noResults: string;
  };
  summary: {
    totalLeads: (n: number) => string;
    pipelineValue: string;
    winRate: string;
  };
  board: {
    leadsCount: (n: number) => string;
    addLead: string;
    emptyColumn: string;
  };
  card: {
    editLabel: string;
    deleteLabel: string;
    moveLabel: string;
    priorityLabel: string;
    overdue: string;
    followUpOn: (date: string) => string;
  };
  modal: {
    addTitle: string;
    editTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    valueLabel: string;
    valuePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    stageLabel: string;
    priorityLabel: string;
    followUpLabel: string;
    cancelButton: string;
    saveButton: string;
    nameRequired: string;
  };
  toast: {
    deleted: string;
    undo: string;
  };
  footer: {
    disclaimer: string;
  };
  langSwitch: {
    label: string;
  };
  themeToggle: {
    light: string;
    dark: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    header: {
      name: "Lead Flow",
      tagline: "Lead pipeline board",
      byLine: "by mpintea.dev",
    },
    hero: {
      heading: "Your leads, without the spreadsheet",
      subhead:
        "A drag-and-drop pipeline board — the same kind of internal tool that replaces a messy spreadsheet of leads and follow-ups. Move cards between stages, add or edit a lead, see the pipeline value update.",
      metaNote:
        "This is the same kind of tool used to manage leads for this site — nothing here is saved, sent, or connected to any real system. Everything resets when you reload the page.",
      resetButton: "Reset demo data",
      resetConfirm: "Reset the board to the sample leads? Your changes will be lost.",
    },
    stages: {
      new: "New",
      contacted: "Contacted",
      proposal: "Proposal Sent",
      won: "Won",
      lost: "Lost",
    },
    priority: {
      hot: "Hot",
      warm: "Warm",
      cold: "Cold",
    },
    search: {
      placeholder: "Search leads by name, company, or notes",
      noResults: "No leads match your search",
    },
    summary: {
      totalLeads: (n) => `${n} ${n === 1 ? "lead" : "leads"} total`,
      pipelineValue: "Pipeline value",
      winRate: "Win rate",
    },
    board: {
      leadsCount: (n) => `${n} ${n === 1 ? "lead" : "leads"}`,
      addLead: "Add lead",
      emptyColumn: "No leads here yet",
    },
    card: {
      editLabel: "Edit lead",
      deleteLabel: "Delete lead",
      moveLabel: "Move to stage",
      priorityLabel: "Priority",
      overdue: "Overdue",
      followUpOn: (date) => `Follow up ${date}`,
    },
    modal: {
      addTitle: "Add a lead",
      editTitle: "Edit lead",
      nameLabel: "Name",
      namePlaceholder: "Contact name",
      companyLabel: "Company",
      companyPlaceholder: "Company name",
      valueLabel: "Deal value (EUR)",
      valuePlaceholder: "0",
      notesLabel: "Notes",
      notesPlaceholder: "Anything worth remembering about this lead",
      stageLabel: "Stage",
      priorityLabel: "Priority",
      followUpLabel: "Follow-up date",
      cancelButton: "Cancel",
      saveButton: "Save lead",
      nameRequired: "Name is required.",
    },
    toast: {
      deleted: "Lead deleted.",
      undo: "Undo",
    },
    footer: {
      disclaimer: "Demo data only — nothing here is saved, sent, or connected to any real system.",
    },
    langSwitch: {
      label: "Language",
    },
    themeToggle: {
      light: "Switch to light theme",
      dark: "Switch to dark theme",
    },
  },
  ro: {
    header: {
      name: "Lead Flow",
      tagline: "Pipeline de leaduri",
      byLine: "de mpintea.dev",
    },
    hero: {
      heading: "Leadurile tale, fără foaie de calcul",
      subhead:
        "Un pipeline drag-and-drop — genul de instrument intern care înlocuiește o foaie de calcul dezordonată cu leaduri și urmăriri. Muți cardurile între etape, adaugi sau editezi un lead, vezi valoarea pipeline-ului actualizându-se.",
      metaNote:
        "Acesta e genul de instrument folosit pentru a gestiona leadurile acestui site — nimic de aici nu e salvat, trimis sau conectat la vreun sistem real. Totul se resetează la reîncărcarea paginii.",
      resetButton: "Resetează datele demo",
      resetConfirm: "Resetezi tabla la leadurile din exemplu? Modificările tale se vor pierde.",
    },
    stages: {
      new: "Nou",
      contacted: "Contactat",
      proposal: "Ofertă trimisă",
      won: "Câștigat",
      lost: "Pierdut",
    },
    priority: {
      hot: "Fierbinte",
      warm: "Cald",
      cold: "Rece",
    },
    search: {
      placeholder: "Caută leaduri după nume, companie sau notițe",
      noResults: "Niciun lead nu corespunde căutării",
    },
    summary: {
      totalLeads: (n) => `${n} ${n === 1 ? "lead" : "leaduri"} în total`,
      pipelineValue: "Valoare pipeline",
      winRate: "Rată de succes",
    },
    board: {
      leadsCount: (n) => `${n} ${n === 1 ? "lead" : "leaduri"}`,
      addLead: "Adaugă lead",
      emptyColumn: "Niciun lead aici încă",
    },
    card: {
      editLabel: "Editează lead",
      deleteLabel: "Șterge lead",
      moveLabel: "Mută la etapa",
      priorityLabel: "Prioritate",
      overdue: "Întârziat",
      followUpOn: (date) => `Urmărire ${date}`,
    },
    modal: {
      addTitle: "Adaugă un lead",
      editTitle: "Editează lead",
      nameLabel: "Nume",
      namePlaceholder: "Numele persoanei de contact",
      companyLabel: "Companie",
      companyPlaceholder: "Numele companiei",
      valueLabel: "Valoare tranzacție (EUR)",
      valuePlaceholder: "0",
      notesLabel: "Notițe",
      notesPlaceholder: "Orice merită reținut despre acest lead",
      stageLabel: "Etapă",
      priorityLabel: "Prioritate",
      followUpLabel: "Dată de urmărire",
      cancelButton: "Anulează",
      saveButton: "Salvează lead",
      nameRequired: "Numele este obligatoriu.",
    },
    toast: {
      deleted: "Lead șters.",
      undo: "Anulează",
    },
    footer: {
      disclaimer: "Doar date demo — nimic de aici nu e salvat, trimis sau conectat la vreun sistem real.",
    },
    langSwitch: {
      label: "Limbă",
    },
    themeToggle: {
      light: "Comută la tema deschisă",
      dark: "Comută la tema întunecată",
    },
  },
  ru: {
    header: {
      name: "Lead Flow",
      tagline: "Воронка лидов",
      byLine: "от mpintea.dev",
    },
    hero: {
      heading: "Ваши лиды без таблицы Excel",
      subhead:
        "Доска с перетаскиванием карточек — тот же внутренний инструмент, что заменяет беспорядочную таблицу с лидами и напоминаниями. Перемещайте карточки между этапами, добавляйте или редактируйте лида, смотрите, как обновляется сумма воронки.",
      metaNote:
        "Это тот же тип инструмента, что используется для управления лидами этого сайта — ничего здесь не сохраняется, не отправляется и не подключено к реальной системе. При обновлении страницы всё сбрасывается.",
      resetButton: "Сбросить демо-данные",
      resetConfirm: "Сбросить доску к примерам лидов? Ваши изменения будут потеряны.",
    },
    stages: {
      new: "Новый",
      contacted: "Связались",
      proposal: "Предложение",
      won: "Успешно",
      lost: "Отказ",
    },
    priority: {
      hot: "Горячий",
      warm: "Тёплый",
      cold: "Холодный",
    },
    search: {
      placeholder: "Поиск по имени, компании или заметкам",
      noResults: "Нет лидов по вашему запросу",
    },
    summary: {
      totalLeads: (n) => `Всего ${n} ${n === 1 ? "лид" : "лидов"}`,
      pipelineValue: "Сумма воронки",
      winRate: "Конверсия",
    },
    board: {
      leadsCount: (n) => `${n} ${n === 1 ? "лид" : "лидов"}`,
      addLead: "Добавить лида",
      emptyColumn: "Пока нет лидов",
    },
    card: {
      editLabel: "Редактировать лида",
      deleteLabel: "Удалить лида",
      moveLabel: "Переместить на этап",
      priorityLabel: "Приоритет",
      overdue: "Просрочено",
      followUpOn: (date) => `Напоминание ${date}`,
    },
    modal: {
      addTitle: "Добавить лида",
      editTitle: "Редактировать лида",
      nameLabel: "Имя",
      namePlaceholder: "Имя контакта",
      companyLabel: "Компания",
      companyPlaceholder: "Название компании",
      valueLabel: "Сумма сделки (EUR)",
      valuePlaceholder: "0",
      notesLabel: "Заметки",
      notesPlaceholder: "Всё, что стоит помнить об этом лиде",
      stageLabel: "Этап",
      priorityLabel: "Приоритет",
      followUpLabel: "Дата напоминания",
      cancelButton: "Отмена",
      saveButton: "Сохранить лида",
      nameRequired: "Имя обязательно.",
    },
    toast: {
      deleted: "Лид удалён.",
      undo: "Отменить",
    },
    footer: {
      disclaimer: "Только демо-данные — ничего здесь не сохраняется, не отправляется и не подключено к реальной системе.",
    },
    langSwitch: {
      label: "Язык",
    },
    themeToggle: {
      light: "Светлая тема",
      dark: "Тёмная тема",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "ro";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "ro" || stored === "ru" || stored === "en") return stored;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  if (browser === "ro" || browser === "ru") return browser;
  return "en";
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return { locale, setLocale, t: dictionaries[locale] };
}

export function numberLocale(locale: Locale): string {
  if (locale === "ro") return "ro-RO";
  if (locale === "ru") return "ru-RU";
  return "en-US";
}
