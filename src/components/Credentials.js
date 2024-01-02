import { useFile } from "@/context/FileContext";
import React from "react";

const Credentials = () => {
  const { creds, setCreds } = useFile();
  return (
    <form className="w-full">
      <div className="mb-6">
        <label htmlFor="email" className="label">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="input"
          value={creds.email}
          onChange={(e) => {
            setCreds((prev) => {
              prev.email = e.target.value;
              return { ...prev };
            });
          }}
          placeholder="john.doe@company.com"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="•••••••••"
          value={creds.password}
          onChange={(e) => {
            setCreds((prev) => {
              prev.password = e.target.value;
              return { ...prev };
            });
          }}
          required
        />
      </div>
    </form>
  );
};

export default Credentials;
