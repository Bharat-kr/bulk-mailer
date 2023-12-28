"use client";

import { FileProvider } from "@/context/FileContext";

export function Providers({ children }) {
  return <FileProvider>{children}</FileProvider>;
}
