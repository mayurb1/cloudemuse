export default function FavoriteButton({
  active = false,
  onClick,
  title,
  size = "md",
  className = "",
}) {
  const sizeClasses = size === "sm" ? "p-1.5" : "p-2";
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <button
      type="button"
      onClick={onClick}
      title={title || (active ? "Remove from favorites" : "Add to favorites")}
      className={`inline-flex items-center justify-center rounded-full ${sizeClasses} transition-colors transition-transform active:scale-95 ring-1 shadow-sm ${
        active
          ? "bg-rose-500 text-white ring-rose-600 hover:bg-rose-600"
          : "bg-white/80 text-slate-600 hover:bg-white ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800 dark:ring-slate-600"
      } ${className}`}
      aria-pressed={active}
    >
      {active ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${iconSize} fill-current`}
        >
          <path d="M12 21s-6.716-4.297-9.355-7.54C.88 11.34 1.094 8.6 2.88 6.88 4.486 5.34 7.01 5.5 8.6 7.1L12 10.5l3.4-3.4c1.59-1.6 4.114-1.76 5.72-.22 1.786 1.72 2 4.46.235 6.58C18.716 16.703 12 21 12 21z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${iconSize}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  );
}
