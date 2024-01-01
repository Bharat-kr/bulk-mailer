"use client";
import { useFile } from "@/context/FileContext";
import { useEffect, useState } from "react";

export default function DataMapper() {
  const { mailList } = useFile();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    let arr = [];
    Object.keys(mailList[0]).forEach((key) => {
      arr.push(key);
    });
    setKeys(arr);
  }, [mailList]);

  return (
    <div className="w-full overflow-y-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys.map((key) => {
                return (
                  <th key={key} scope="col" className="px-6 py-3">
                    {key}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {mailList.map((item, idx) => {
              return (
                <tr
                  key={JSON.stringify(item) + `${idx}`}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {keys.map((key) => {
                    return (
                      <td key={item[key]} className="px-6 py-4">
                        {`${item[key]}`}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
