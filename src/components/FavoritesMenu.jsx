import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

export default function FavoritesMenu({
  items = [],
  onSelect,
  onRemove,
  onAddCurrent,
  canAddCurrent = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-full ring-1 ring-slate-200 dark:ring-slate-600 bg-white/80 dark:bg-slate-800/80 px-4 hover:brightness-105"
        onClick={() => setOpen((o) => !o)}
        title="Favorites"
      >
        <Star className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        <span className="text-sm text-slate-700 dark:text-slate-100">
          Favorites
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white ring-1 ring-slate-200 shadow-soft dark:bg-slate-800 dark:ring-slate-700 z-20">
          <div className="p-2 max-h-72 overflow-auto">
            {canAddCurrent && (
              <button
                onClick={() => {
                  onAddCurrent?.();
                  setOpen(false);
                }}
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm mb-1"
              >
                + Add current city
              </button>
            )}
            {items.length === 0 && (
              <div className="px-2 py-2 text-sm text-slate-500">
                No favorites yet
              </div>
            )}
            {items.map((city) => (
              <div
                key={city}
                className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <button
                  onClick={() => {
                    onSelect?.(city);
                    setOpen(false);
                  }}
                  className="text-sm text-slate-800 dark:text-slate-100 truncate pr-2"
                >
                  {city}
                </button>
                <button
                  onClick={() => onRemove?.(city)}
                  className="text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
