import { useEffect, useRef, useState } from "react";

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
        className="btn-secondary inline-flex items-center gap-2"
        onClick={() => setOpen((o) => !o)}
        title="Favorites"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-sky-600 dark:text-sky-400"
          fill="currentColor"
        >
          <path d="M12 .587l3.668 7.431L24 9.753l-6 5.848 1.416 8.265L12 19.771 4.584 23.866 6 15.601 0 9.753l8.332-1.735z" />
        </svg>
        <span className="text-sm">Favorites</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-white ring-1 ring-slate-200 shadow-lg dark:bg-slate-800 dark:ring-slate-700 z-20">
          <div className="p-2 max-h-72 overflow-auto">
            {canAddCurrent && (
              <button
                onClick={() => {
                  onAddCurrent?.();
                  setOpen(false);
                }}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-700 text-sm mb-1"
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
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-700"
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
