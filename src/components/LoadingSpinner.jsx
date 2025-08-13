export default function LoadingSpinner() {
  return (
    <div
      className="flex items-center justify-center py-10"
      role="status"
      aria-label="Loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-sky-600 dark:border-slate-600 dark:border-t-sky-400" />
    </div>
  );
}
