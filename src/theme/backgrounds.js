const lightGradients = {
  "clear-sky": "linear-gradient(to bottom, #60a5fa, #fef08a)",
  clouds: "linear-gradient(to bottom, #94a3b8, #cbd5e1)",
  rain: "linear-gradient(to bottom, #60a5fa, #93c5fd, #64748b)",
  snow: "linear-gradient(to bottom, #e2e8f0, #f8fafc)",
  thunderstorm: "linear-gradient(to bottom, #0f172a, #334155)",
  mist: "linear-gradient(to bottom, #cbd5e1, #e2e8f0)",
};

const darkGradients = {
  "clear-sky": "linear-gradient(to bottom, #1e293b, #0f172a)",
  clouds: "linear-gradient(to bottom, #334155, #0f172a)",
  rain: "linear-gradient(to bottom, #1e293b, #0f172a)",
  snow: "linear-gradient(to bottom, #475569, #0b1020)",
  thunderstorm: "linear-gradient(to bottom, #020617, #0b1220)",
  mist: "linear-gradient(to bottom, #334155, #111827)",
};

export function getBackgroundStyle(key, resolvedTheme) {
  const map = resolvedTheme === "dark" ? darkGradients : lightGradients;
  const g = map[key] || map["clear-sky"];
  return { backgroundImage: g };
}
