"use client";
const { createContext, useContext, useState, useEffect } = require("react");
import { list } from "@/utils/dummy_data";
import { PAGE_STATES } from "@/utils/enums";
import csv from "csvtojson";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [currPageState, setCurrPageState] = useState(PAGE_STATES.HOME);
  const [selectedFile, setSelectedFile] = useState();
  const [mailList, setMailList] = useState([]);
  const [mailTemplate, setMailTemplate] = useState(
    "<h1>Hello from CKEditor in Next.js!</h1>"
  );
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const init = async () => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        csv({
          noheader: true,
          output: "json",
        })
          .fromString(fileAsBinaryString)
          .then((csvRows) => {
            const toJson = [];
            csvRows.forEach((aCsvRow, i) => {
              if (i !== 0) {
                const builtObject = {};
                Object.keys(aCsvRow).forEach((aKey) => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  const keyToAddInBuiltObject = csvRows[0][aKey];
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                });
                toJson.push(builtObject);
              }
            });

            console.log(toJson);
            setMailList(toJson);
            setCurrPageState(PAGE_STATES.LIST);
          });
      };

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsBinaryString(selectedFile);
    };
    if (selectedFile) {
      init();
    }
  }, [selectedFile]);

  const value = {
    creds,
    setCreds,
    mailList,
    setMailList,
    selectedFile,
    currPageState,
    setSelectedFile,
    setCurrPageState,
    mailTemplate,
    setMailTemplate,
  };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

const useFile = () => useContext(FileContext);
export { FileProvider, useFile };
