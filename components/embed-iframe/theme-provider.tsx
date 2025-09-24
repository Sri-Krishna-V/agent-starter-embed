import { THEME_MEDIA_QUERY } from '@/lib/env';

const THEME_SCRIPT = `
  const doc = document.documentElement;
  // Force light theme only - ignoring URL parameters and system preferences
  doc.classList.add("light");
  doc.classList.remove("dark");
`
  .trim()
  .replace(/\n/g, '')
  .replace(/\s+/g, ' ');

export function ApplyThemeScript() {
  return <script id="theme-script">{THEME_SCRIPT}</script>;
}
