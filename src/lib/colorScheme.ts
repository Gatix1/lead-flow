export type ColorScheme = "light" | "dark";

const STORAGE_KEY = "lead-flow-color-scheme";

export function getInitialColorScheme(): ColorScheme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function persistColorScheme(scheme: ColorScheme) {
  localStorage.setItem(STORAGE_KEY, scheme);
}
