import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext({ showToast: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, { type = "info", duration = 2500 } = {}) {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center sm:inset-auto sm:right-4 sm:top-4 sm:bottom-auto">
        <div className="flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`rounded-md px-3 py-2 text-sm shadow-lg ring-1 backdrop-blur transition-all duration-200 ${
                t.type === "success"
                  ? "bg-emerald-500/90 text-white ring-emerald-600"
                  : t.type === "error"
                  ? "bg-rose-500/90 text-white ring-rose-600"
                  : "bg-slate-800/90 text-slate-100 ring-slate-700"
              }`}
            >
              {t.message}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
