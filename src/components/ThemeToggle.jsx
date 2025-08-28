import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    (localStorage.getItem("qf_theme") || "dark") === "dark"
  );
  useEffect(() => {
    const val = dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", val === "dark" ? "dark" : "");
    localStorage.setItem("qf_theme", val);
  }, [dark]);
  return (
    <button
      className="border px-3 py-1.5 rounded-md text-sm"
      onClick={() => setDark(v => !v)}
      title="Theme wechseln"
    >
      {dark ? "☀︎ Light" : "🌙 Dark"}
    </button>
  );
}
