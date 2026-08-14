export type Stage = "new" | "contacted" | "proposal" | "won" | "lost";

export const STAGE_ORDER: Stage[] = ["new", "contacted", "proposal", "won", "lost"];

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  notes: string;
  stage: Stage;
}

export type LeadDraft = Omit<Lead, "id">;
