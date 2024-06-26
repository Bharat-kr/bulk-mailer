import { useFile } from "@/context/FileContext";
import React from "react";

const Home = () => {
  const { setSelectedFile, setCurrPageState } = useFile();
  return (
    <label
      htmlFor="dropzone-file"
      className="mx-auto my-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-700 dark:border-gray-200 p-6 text-center text-blue-500 dark:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>

      <h2 className="mt-4 text-xl font-medium tracking-wide">CSV File</h2>

      <p className="mt-2 tracking-wide">
        Upload or darg & drop your csv file.{" "}
      </p>

      <input
        id="dropzone-file"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
          }
        }}
      />
    </label>
  );
};

export default Home;
