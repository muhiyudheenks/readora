import React, { useEffect, useState } from 'react';

function Darkmode() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle dark theme"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xl text-slate-700 dark:text-amber-400 hover:scale-110 hover:shadow-md transition-all duration-300 active:scale-95 touch-target"
        >
            <span className="transition-transform duration-300 transform hover:rotate-12">
                {theme === "light" ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default Darkmode;
