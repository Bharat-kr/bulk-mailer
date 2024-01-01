"use client";
import DataMapper from "@/components/DataMapper";
import { useFile } from "@/context/FileContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const { setSelectedFile, selectedFile, mailList, setMailList } = useFile();

  const [taskId, setTaskId] = useState("");
  const clickHandler = async () => {
    try {
      const result = await axios.post("/api/email", {
        leads: mailList,
        email: "kumabharat123@gmail.com",
        password: "qvlhoprolsxpcrvr",
      });
      console.log(result.data);
      setMailList(result.data.leads);
      setTaskId(result.data.task_id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const refresh = async () => {
    try {
      const result = await axios.get(`/api/tasks/${taskId}`);
      setMailList(result.data.leads)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 h-full">
      <p className="text-3xl font-bold font-open-sans">Bulk ~ Mailer</p>
      {/* <label
        htmlFor="dropzone-file"
        className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-gray-200 p-6 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-500"
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

        <h2 className="mt-4 text-xl font-medium text-white tracking-wide">
          CSV File
        </h2>

        <p className="mt-2 text-blue-500 tracking-wide">
          Upload or darg & drop your file SVG, PNG, JPG or GIF.{" "}
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
      </label> */}

      <DataMapper />

      <button
        type="button"
        onClick={clickHandler}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Next
      </button>
      <button
        type="button"
        onClick={refresh}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Refresh
      </button>
    </main>
  );
}
