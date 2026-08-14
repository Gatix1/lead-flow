export type Stage = "new" | "contacted" | "proposal" | "won" | "lost";

export const STAGE_ORDER: Stage[] = ["new", "contacted", "proposal", "won", "lost"];

export type Priority = "hot" | "warm" | "cold";

export const PRIORITY_ORDER: Priority[] = ["hot", "warm", "cold"];

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  notes: string;
  stage: Stage;
  priority: Priority;
  followUpDate: string | null;
}

export type LeadDraft = Omit<Lead, "id">;
