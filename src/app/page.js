"use client";
import Credentials from "@/components/Credentials";
import DataMapper from "@/components/DataMapper";
import Editor from "@/components/Editor";
import Home from "@/components/Home";
import ThemeToggle from "@/components/ThemeToggle";
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
  const {
    setCurrPageState,
    mailList,
    currPageState,
    creds,
    mailTemplate,
    subject,
  } = useFile();

  const nextHandler = async () => {
    let keys = Object.values(PAGE_STATES);
    let curr_index = keys.indexOf(currPageState);
    // console.log(curr_index);
    if (curr_index < keys.length - 1) {
      setCurrPageState(keys[curr_index + 1]);
    } else {
      //Finally create Task & navigate to task page
      try {
        const result = await axios.post("/api/email", {
          ...creds,
          template: mailTemplate,
          leads: mailList,
          subject,
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
      <ThemeToggle />
      {name_to_component[currPageState]}
      <div className="flex items-center justify-center w-full mt-4">
        {PAGE_STATES.HOME != currPageState ? (
          <button
            type="button"
            onClick={nextHandler}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-full text-lg px-5 py-2.5 text-center mb-2 w-48"
          >
            Next
          </button>
        ) : (
          <p className="text-center text-sm font-colour">
            This service uses the gmail for sending mail and will ask you to put
            your app password for working , also as gmail limits the sending of
            bulk mails this keep a 5 minute delay for sending mails so, do not
            try this service to send emails for more than 50 mails a day as it
            may give unexpected delivery issues or might land your mails in
            spams.
          </p>
        )}
      </div>
    </>
  );
}
