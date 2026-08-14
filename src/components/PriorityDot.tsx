import clsx from "clsx";
import type { Priority } from "../lib/types";

const PRIORITY_DOT: Record<Priority, string> = {
  hot: "bg-accent-text",
  warm: "bg-ink-muted",
  cold: "bg-ink-faint",
};

interface PriorityDotProps {
  priority: Priority;
  className?: string;
}

export function PriorityDot({ priority, className }: PriorityDotProps) {
  return <span className={clsx("h-1.5 w-1.5 shrink-0 rounded-full", PRIORITY_DOT[priority], className)} />;
}
