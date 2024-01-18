"use client";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode != null) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkMode]);
  return (
    <div
      className="fixed z-10 top-14 right-10 sm:top-10 sm:right-8 md:top-10 md:right-10 cursor-pointer"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      {darkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="h-6 w-6 md:h-4 md:w-4 text-gray-400"
          x="0"
          y="0"
          viewBox="0 0 312.812 312.812"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M305.2 178.159c-3.2-.8-6.4 0-9.2 2-10.4 8.8-22.4 16-35.6 20.8-12.4 4.8-26 7.2-40.4 7.2-32.4 0-62-13.2-83.2-34.4-21.2-21.2-34.4-50.8-34.4-83.2 0-13.6 2.4-26.8 6.4-38.8 4.4-12.8 10.8-24.4 19.2-34.4 3.6-4.4 2.8-10.8-1.6-14.4-2.8-2-6-2.8-9.2-2-34 9.2-63.6 29.6-84.8 56.8-20.4 26.8-32.4 60-32.4 96 0 43.6 17.6 83.2 46.4 112s68 46.4 112 46.4c36.8 0 70.8-12.8 98-34 27.6-21.6 47.6-52.4 56-87.6 1.6-5.6-1.6-11.2-7.2-12.4z"
              fill="currentColor"
              opacity="1"
            ></path>
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="h-8 w-8 md:h-6 md:w-6"
          x="0"
          y="0"
          viewBox="0 0 302.4 302.4"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M204.8 97.6C191.2 84 172 75.2 151.2 75.2s-40 8.4-53.6 22.4c-13.6 13.6-22.4 32.8-22.4 53.6s8.8 40 22.4 53.6c13.6 13.6 32.8 22.4 53.6 22.4s40-8.4 53.6-22.4c13.6-13.6 22.4-32.8 22.4-53.6s-8.4-40-22.4-53.6zm-14.4 92.8c-10 10-24 16-39.2 16s-29.2-6-39.2-16-16-24-16-39.2 6-29.2 16-39.2 24-16 39.2-16 29.2 6 39.2 16 16 24 16 39.2-6 29.2-16 39.2zM292 140.8h-30.8c-5.6 0-10.4 4.8-10.4 10.4 0 5.6 4.8 10.4 10.4 10.4H292c5.6 0 10.4-4.8 10.4-10.4 0-5.6-4.8-10.4-10.4-10.4zM151.2 250.8c-5.6 0-10.4 4.8-10.4 10.4V292c0 5.6 4.8 10.4 10.4 10.4 5.6 0 10.4-4.8 10.4-10.4v-30.8c0-5.6-4.8-10.4-10.4-10.4zM258 243.6l-22-22c-3.6-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22c4 4 10.4 4 14.4 0s4-10.4 0-14.4zM151.2 0c-5.6 0-10.4 4.8-10.4 10.4v30.8c0 5.6 4.8 10.4 10.4 10.4 5.6 0 10.4-4.8 10.4-10.4V10.4c0-5.6-4.8-10.4-10.4-10.4zM258.4 44.4c-4-4-10.4-4-14.4 0l-22 22c-4 4-4 10.4 0 14.4 3.6 4 10.4 4 14.4 0l22-22c4-4 4-10.4 0-14.4zM41.2 140.8H10.4c-5.6 0-10.4 4.8-10.4 10.4s4.4 10.4 10.4 10.4h30.8c5.6 0 10.4-4.8 10.4-10.4 0-5.6-4.8-10.4-10.4-10.4zM80.4 221.6c-3.6-4-10.4-4-14.4 0l-22 22c-4 4-4 10.4 0 14.4s10.4 4 14.4 0l22-22c4-4 4-10.4 0-14.4zM80.4 66.4l-22-22c-4-4-10.4-4-14.4 0s-4 10.4 0 14.4l22 22c4 4 10.4 4 14.4 0s4-10.4 0-14.4z"
              fill="#000000"
              opacity="1"
              className=""
            ></path>
          </g>
        </svg>
      )}
    </div>
  );
};

export default ThemeToggle;
