import { useEffect, useRef, useState } from "react";
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
    <div className="w-full max-w-xl mx-auto relative" ref={boxRef}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search city..."
          className="input-text rounded-r-none"
          value={value}
          onChange={(e) => handleType(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button type="submit" className="btn-primary rounded-l-none">
          Search
        </button>
      </form>
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-64 overflow-auto rounded-md bg-white ring-1 ring-slate-200 shadow-lg dark:bg-slate-800 dark:ring-slate-700">
          {suggestions.map((s, idx) => (
            <li
              key={`${s.name}-${s.lat}-${s.lon}`}
              className={`px-3 py-2 cursor-pointer text-sm ${
                idx === highlightIdx ? "bg-sky-50 dark:bg-sky-900/40" : ""
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(s);
              }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
