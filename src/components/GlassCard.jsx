export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl bg-white/60 dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700 backdrop-blur shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
