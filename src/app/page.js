"use client";
import Credentials from "@/components/Credentials";
import DataMapper from "@/components/DataMapper";
import Editor from "@/components/Editor";
import Home from "@/components/Home";
import { useFile } from "@/context/FileContext";
import { PAGE_STATES } from "@/utils/enums";
import axios from "axios";

const name_to_component = {
  [PAGE_STATES.HOME]: <Home />,
  [PAGE_STATES.LIST]: <DataMapper />,
  [PAGE_STATES.EDITOR]: <Editor />,
  [PAGE_STATES.CREDENTIALS]: <Credentials />,
};

export default function Page() {
  const { setCurrPageState, mailList, currPageState, creds, mailTemplate } =
    useFile();

  const nextHandler = async () => {
    let keys = Object.values(PAGE_STATES);
    let curr_index = keys.indexOf(currPageState);
    console.log(curr_index);
    if (curr_index < keys.length - 1) {
      setCurrPageState(keys[curr_index + 1]);
    } else {
      //Finally create Task & navigate to task page
      try {
        const result = await axios.post("/api/email", {
          ...creds,
          template: mailTemplate,
          leads: mailList,
        });
        console.log(result);
        window.location.href = `/tasks/${result.data.task_id}`;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {name_to_component[currPageState]}
      <div className="flex items-center justify-center w-full mt-4">
        {PAGE_STATES.HOME != currPageState && (
          <button
            type="button"
            onClick={nextHandler}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
