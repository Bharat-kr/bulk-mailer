"use client";
const { createContext, useContext, useState, useEffect } = require("react");
import csv from "csvtojson";

const FileContext = createContext();

const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [mailList, setMailList] = useState([]);

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
    selectedFile,
    setSelectedFile,
    mailList,
    setMailList,
  };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

const useFile = () => useContext(FileContext);
export { FileProvider, useFile };
