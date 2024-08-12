import React from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeSwitcher({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean | null;
  toggleTheme: () => void;
}) {
  return (
    <div
      onClick={toggleTheme}
      className="relative h-10 w-20 cursor-pointer overflow-hidden rounded-full p-1 transition-all duration-300 ease-in-out"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 80 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(var(--primary-color))",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(var(--primary-color))", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect
          width="80"
          height="40"
          rx="20"
          ry="20"
          fill={"url(#skyGradient)"}
        />
        {isDarkMode ? (
          <>
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 50}
                cy={Math.random() * 40}
                r={Math.random() * 1 + 0.5}
                fill="rgb(var(--text-primary-color))"
              />
            ))}
          </>
        ) : (
          <>
            <path
              cx={50}
              d="M 65 20 Q 70 25 65 30 Q 75 25 65 20"
              fill="rgb(var(--text-primary-color))"
            />
            <path
              cx={50}
              d="M 55 15 Q 60 20 55 25 Q 65 20 55 15"
              fill="rgb(var(--text-primary-color))"
            />
            <path
              cx={50}
              d="M 45 10 Q 50 15 45 20 Q 55 15 45 10"
              fill="rgb(var(--text-primary-color))"
            />
          </>
        )}
      </svg>
      <div
        className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-textPrimary shadow-md transition-transform duration-300 ease-in-out ${
          isDarkMode ? "translate-x-10" : "translate-x-0"
        }`}
      >
        <span className="text-xl">
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </span>
      </div>
    </div>
  );
}
