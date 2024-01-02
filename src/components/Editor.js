"use client";
import React from "react";

import dynamic from "next/dynamic";
import { useFile } from "@/context/FileContext";

const CustomEditor = dynamic(
  () => {
    return import("../components/custom-editor");
  },
  { ssr: false }
);

const Editor = () => {
  const { mailTemplate, setMailTemplate } = useFile();
  return (
    <CustomEditor
      initialData={mailTemplate}
      onChange={(val) => {
        setMailTemplate(val);
      }}
    />
  );
};

export default Editor;
