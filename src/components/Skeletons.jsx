export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/50 dark:bg-slate-800/40 ring-1 ring-slate-200 dark:ring-slate-700 p-6 animate-pulse">
      <div className="h-6 w-40 bg-slate-300/60 dark:bg-slate-600/60 rounded"></div>
      <div className="mt-2 h-4 w-24 bg-slate-300/60 dark:bg-slate-600/60 rounded"></div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="h-16 bg-slate-300/60 dark:bg-slate-600/60 rounded"></div>
        <div className="h-16 bg-slate-300/60 dark:bg-slate-600/60 rounded"></div>
        <div className="h-16 bg-slate-300/60 dark:bg-slate-600/60 rounded"></div>
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-20 rounded bg-slate-300/60 dark:bg-slate-600/60"
        ></div>
      ))}
    </div>
  );
}
