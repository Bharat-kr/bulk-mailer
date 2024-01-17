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
        <label htmlFor="password" className="label">
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
      <p className="flex gap-4 items-center font-colour">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          className="w-4 h-4 text-gray-400"
        >
          <g>
            <g data-name="Layer 2">
              <g data-name="Layer 1 copy 3">
                <g data-name="5">
                  <path
                    d="M256 30a226.06 226.06 0 0 1 88 434.25 226.06 226.06 0 0 1-176-416.5A224.5 224.5 0 0 1 256 30m0-30C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0z"
                    fill="currentColor"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <rect
                    width="64.84"
                    height="194.53"
                    x="223.58"
                    y="201.47"
                    rx="32.42"
                    fill="currentColor"
                    opacity="1"
                    data-original="#000000"
                  ></rect>
                  <circle
                    cx="256"
                    cy="148.42"
                    r="32.42"
                    fill="currentColor"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                </g>
              </g>
            </g>
          </g>
        </svg>
        To know more about the email password to be used here{" "}
        <a
          href="/help"
          target="_blank"
          className="hover:underline text-blue-900"
        >
          Click here
        </a>
      </p>
    </form>
  );
};

export default Credentials;
