import { useEffect, useRef, useState } from "react";
import { Search as IconSearch } from "lucide-react";
import { searchCities } from "../services/weatherService";

export default function SearchBar({
  initialValue = "",
  onSearch,
  onSelectSuggestion,
}) {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const boxRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    function onDocClick(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  async function handleType(q) {
    setValue(q);
    setHighlightIdx(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (q.trim().length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      try {
        const results = await searchCities(q, 7);
        setSuggestions(results);
        setOpen(true);
      } catch {
        setSuggestions([]);
        setOpen(false);
      }
    }, 200);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const query = value.trim();
    if (query && onSearch) onSearch(query);
    setOpen(false);
  }

  function selectSuggestion(s) {
    setValue(s.name);
    setOpen(false);
    onSelectSuggestion?.(s);
    if (onSearch) onSearch(s.name);
  }

  function onKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (highlightIdx >= 0) {
        e.preventDefault();
        selectSuggestion(suggestions[highlightIdx]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="w-full relative" ref={boxRef}>
      <form onSubmit={handleSubmit} className="flex w-full items-stretch">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <IconSearch className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search city..."
            className="w-full rounded-l-full border-none bg-white/80 dark:bg-slate-800/80 ring-1 ring-slate-300 dark:ring-slate-600 focus:ring-2 focus:ring-sky-400 shadow-soft px-10 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400"
            value={value}
            onChange={(e) => handleType(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <button
          type="submit"
          className="rounded-r-full bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-white font-medium shadow-soft hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Search
        </button>
      </form>
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full max-h-72 overflow-auto rounded-xl bg-white/95 dark:bg-slate-800/95 ring-1 ring-slate-200 dark:ring-slate-700 shadow-soft backdrop-blur">
          {suggestions.map((s, idx) => (
            <li
              key={`${s.name}-${s.lat}-${s.lon}`}
              className={`px-3 py-2 cursor-pointer text-sm flex items-center justify-between ${
                idx === highlightIdx ? "bg-sky-50 dark:bg-sky-900/30" : ""
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(s);
              }}
            >
              <span className="truncate text-slate-800 dark:text-slate-100">
                {s.label}
              </span>
              <span className="text-xs text-slate-400">↵</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
