interface ToastProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export function Toast({ message, actionLabel, onAction }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-glass-border-strong bg-bg-elevated px-4 py-2.5 shadow-lifted">
      <p className="text-xs text-ink">{message}</p>
      <button
        onClick={onAction}
        className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink transition-transform hover:scale-105"
      >
        {actionLabel}
      </button>
    </div>
  );
}
