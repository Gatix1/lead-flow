import type { Lead } from "../lib/types";

export function createSampleLeads(): Lead[] {
  return [
    {
      id: "lead-1",
      name: "Andrei Rusu",
      company: "Bunătăți Bucovina SRL",
      value: 3200,
      notes: "Found us via referral. Wants an inventory tracker for the bakery.",
      stage: "new",
    },
    {
      id: "lead-2",
      name: "Elena Ciobanu",
      company: "Ciobanu Logistics",
      value: 8100,
      notes: "Asked about route/dispatch automation. Sending a short scope doc.",
      stage: "new",
    },
    {
      id: "lead-3",
      name: "Мария Волкова",
      company: "Volkova Studio",
      value: 1450,
      notes: "Needs a simple booking form for the studio. Follow up Thursday.",
      stage: "contacted",
    },
    {
      id: "lead-4",
      name: "Igor Popescu",
      company: "Popescu & Fii",
      value: 5400,
      notes: "Second call scheduled — wants a demo of the reporting dashboard.",
      stage: "contacted",
    },
    {
      id: "lead-5",
      name: "Дмитрий Соколов",
      company: "Sokolov Import-Export",
      value: 12600,
      notes: "Proposal sent for customs paperwork automation. Awaiting sign-off.",
      stage: "proposal",
    },
    {
      id: "lead-6",
      name: "Cristina Munteanu",
      company: "Munteanu Clinic",
      value: 4300,
      notes: "Quote sent for patient scheduling tool. Budget approved internally.",
      stage: "proposal",
    },
    {
      id: "lead-7",
      name: "Vasile Groza",
      company: "Groza Construct",
      value: 9800,
      notes: "Signed — project kicks off next month. Internal ops dashboard.",
      stage: "won",
    },
    {
      id: "lead-8",
      name: "Ольга Кузнецова",
      company: "Kuznetsova Retail",
      value: 2100,
      notes: "Went with an off-the-shelf tool instead. Keep warm for next year.",
      stage: "lost",
    },
  ];
}
