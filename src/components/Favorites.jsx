export default function Favorites({ items = [], onSelect, onRemove }) {
  if (!items.length) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {items.map((city) => (
        <div key={city} className="chip flex items-center gap-2">
          <button
            onClick={() => onSelect?.(city)}
            className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-400"
            title="Search this city"
          >
            {city}
          </button>
          <button
            onClick={() => onRemove?.(city)}
            className="text-xs text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-500"
            title="Remove from favorites"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
