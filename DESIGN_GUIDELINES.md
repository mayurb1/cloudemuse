## Design Guidelines

These principles ensure a consistent, accessible, and performant UI in this project. Follow them when building new features or refactoring.

### Themes & Colors

- Prefer system of two themes: light and dark (class-based `dark`).
- Backgrounds: use theme-aware gradients via `getBackgroundStyle` (from `theme/theme.jsx`).
- Surfaces: use `card-surface` for cards; avoid custom one-off panel styles.
- Primary action: use `btn-primary` (sky-600). Secondary/neutral: `btn-secondary`.
- Keep contrast high (meets WCAG AA): avoid text on busy gradients; use cards/surfaces.

### Typography

- Global font stack uses Inter; avoid inline font overrides.
- Hierarchy:
  - Page/section headings: `section-title`.
  - Body text: default size; for compact UIs use `text-sm` sparingly.
- Truncation: use `truncate` on titles next to icons to prevent layout shifts.

### Spacing & Layout

- Container: `max-w-6xl` with responsive padding `px-3 sm:px-4`.
- Use `gap-*` utilities to separate elements; avoid margin stacking quirks.
- Touch areas: minimum 44x44px; inputs/buttons use shared utilities with min-height.
- Safe areas: respect mobile notches via `env(safe-area-inset-*)` (already applied in `index.css`).

### Responsiveness

- Breakpoints: `grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12` for dense lists.
- Cards: prefer stacking on small screens; scale icons/text (`text-xl → text-2xl` for larger screens).
- Avoid horizontal scrolling on mobile unless the content truly demands it.

### Reusable Utilities (from `src/index.css`)

- `card-surface`: themed, blurred, high-contrast card surface.
- `btn-primary`, `btn-secondary`: consistent buttons with focus rings.
- `input-text`: inputs with good contrast and focus states.
- `chip`, `section-title`: compact labels and headings.

### Theming

- Toggle: use the existing animated switch (`ThemeToggle`) backed by `ThemeProvider` (light/dark only).
- When adding new screens:
  - All text must have dark equivalents: `text-slate-800 dark:text-slate-100`.
  - All borders/rings must have dark equivalents: `ring-slate-200 dark:ring-slate-700`.

### Accessibility (a11y)

- Provide visible focus states (`focus:ring-2 focus:ring-sky-400`).
- Add `aria-label` and `title` for icon-only buttons.
- Ensure UI works with keyboard only: tabbable controls, no click-only actions.
- Use semantic roles for status elements (e.g., loading spinners `role="status"`).

### Feedback & States

- Loading: use `LoadingSpinner`. Avoid multiple spinners in a view.
- Errors: show alert-style surface with clear message; avoid toasts for blocking errors.
- Toasts: short-lived confirmations (`ToastProvider`), never for critical failures.

### Data & API

- Use `weatherService.js` for all calls. Do not fetch from components.
- Production uses Netlify function proxy to hide OWM key. Never expose secrets in client code.
- Fallback to Open‑Meteo on OWM failure; keep UX seamless (same icon scheme, units, labels).

### Search & Suggestions

- `SearchBar` provides debounced autosuggest (Open‑Meteo geocoding).
- Keyboard support: Up/Down/Enter/Escape. Mouse clicks should not blur input prematurely.
- Selecting a suggestion prefers coords-based fetch for accuracy.

### Favorites UX

- Centralize management in `FavoritesMenu` next to search.
- Provide "Add current city" only when a city is loaded.
- Show minimal confirmation via toast; avoid intrusive banners.

### Icons & Visuals

- Prefer simple inline SVGs; avoid heavy icon libraries.
- Size icons relative to text (`h-4 w-4`, `h-5 w-5`) and ensure theme-compatible colors.

### Performance

- Keep components presentational where possible; move data logic to services/hooks.
- Batch concurrent requests (e.g., current + forecast + extras) with `Promise.all`.
- Avoid re-render storms by memoizing derived values (e.g., background key).

### Code Style (UI)

- Reuse existing utilities; do not fork styles unless necessary.
- Keep components small, with clear props and defaults; name props by intent (`onSelectSuggestion`).
- Prefer Tailwind classes over ad-hoc inline styles; but use inline `style` for dynamic gradients only.

### Do / Don’t

- Do: test in light & dark, mobile & desktop, slow network.
- Do: keep copy concise and informative.
- Don’t: nest more than 2-3 levels of layout wrappers.
- Don’t: rely on color alone to convey meaning; add text/icon cues.

### Adding New Components Checklist

- [ ] Uses `card-surface`/button/input utilities
- [ ] Themed (dark variants applied)
- [ ] Keyboard accessible + proper aria
- [ ] Responsive at `sm`, `md`, `lg`
- [ ] Uses services for data, not direct fetch
- [ ] Shows loading and error states appropriately
