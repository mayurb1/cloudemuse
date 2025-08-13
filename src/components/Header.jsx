import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/40 dark:bg-slate-900/40 ring-1 ring-slate-200/60 dark:ring-slate-700/60">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-3 flex items-center gap-3">
        <div className="font-semibold text-slate-800 dark:text-slate-100 text-lg">
          Cloudemuse
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
