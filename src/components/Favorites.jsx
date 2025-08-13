export default function Favorites({ items = [], onSelect, onRemove }) {
  if (!items.length) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {items.map((city) => (
        <button
          key={city}
          onClick={() => onSelect?.(city)}
          className="chip inline-flex items-center gap-2 hover:shadow-sm"
          title="Search this city"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400"
            fill="currentColor"
          >
            <path d="M12 21s-6.716-4.297-9.355-7.54C.88 11.34 1.094 8.6 2.88 6.88 4.486 5.34 7.01 5.5 8.6 7.1L12 10.5l3.4-3.4c1.59-1.6 4.114-1.76 5.72-.22 1.786 1.72 2 4.46.235 6.58C18.716 16.703 12 21 12 21z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {city}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(city);
            }}
            className="text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-500"
            title="Remove from favorites"
          >
            ✕
          </span>
        </button>
      ))}
    </div>
  );
}
