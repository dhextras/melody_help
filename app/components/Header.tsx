import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

import DarkModeSwitcher from "./DarkModeSwitcher";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode !== null) {
      const theme = isDarkMode ? "dark-mode" : "light-mode";
      document.body.classList.add(theme);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }

    return () => {
      document.body.classList.remove("dark-mode", "light-mode");
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="bg-secondary text-textPrimary">
      <div className="mx-auto flex items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/image.webp" alt="MoodTunes Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">MoodTunes</span>
        </Link>
        <nav>
          <DarkModeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </nav>
      </div>
    </header>
  );
}
