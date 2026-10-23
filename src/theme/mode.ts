import type { ThemeMode } from "./win11";

export type { ThemeMode } from "./win11";

export const THEME_STORAGE_KEY = "zzzod-theme";

export function resolveThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
  root.style.colorScheme = mode;
}

export function persistThemeMode(mode: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // 隐私模式下 localStorage 不可写，主题仍应在当前页面生效
  }
}
