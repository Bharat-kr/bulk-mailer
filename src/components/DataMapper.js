"use client";
import { useFile } from "@/context/FileContext";
import { useEffect, useState } from "react";

export default function DataMapper() {
  const { mailList } = useFile();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (mailList.length > 0) {
      let arr = [];
      Object.keys(mailList[0]).forEach((key) => {
        arr.push(key);
      });
      setKeys(arr);
    }
  }, [mailList]);

  return (
    <div className="w-full overflow-y-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys?.map((key) => {
                return (
                  <th key={key} scope="col" className="px-6 py-3">
                    {key}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {mailList?.map((item, idx) => {
              return (
                <tr
                  key={JSON.stringify(item) + `${idx}`}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {keys.map((key) => {
                    let val = item[key];
                    switch (typeof val) {
                      case "boolean":
                        return (
                          <td
                            key={item[key]}
                            className="px-6 py-4 flex justify-center"
                          >
                            {!!val ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 507.506 507.506"
                                xmlSpace="preserve"
                                className="w-5 h-5"
                                fill="#38b000"
                              >
                                <g>
                                  <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
                                </g>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="Outline"
                                viewBox="0 0 24 24"
                                fill="#ffb703"
                                className="w-5 h-5"
                              >
                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
                                <path d="M12,6a1,1,0,0,0-1,1v4.325L7.629,13.437a1,1,0,0,0,1.062,1.7l3.84-2.4A1,1,0,0,0,13,11.879V7A1,1,0,0,0,12,6Z" />
                              </svg>
                            )}
                          </td>
                        );
                      default:
                        return (
                          <td key={item[key]} className="px-6 py-4">
                            {val}
                          </td>
                        );
                    }
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
