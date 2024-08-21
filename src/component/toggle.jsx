import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save mode to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3 transition-transform duration-300 ease-in-out transform rounded-full focus:outline-none"
    >
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-1000 ease-in-out
        ${
          darkMode
            ? "bg-blue-500 text-white rotate-180"
            : "bg-blue-950 text-black rotate-0"
        }`}
      >
        {!darkMode ? (
          <span className="text-lg">🌙</span>
        ) : (
          <span className="text-lg">☀️</span>
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
