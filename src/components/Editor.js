//TODO: Messedup clean every thing here
"use client";
import React, { useRef, useState, useEffect } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useFile } from "@/context/FileContext";
import EmojiPicker from "emoji-picker-react";
// import variables from "@/utils/constants";
import { nanoid } from "nanoid";

const Editor = () => {
  const emailBodyRef = useRef();
  const [updateLoading, setUpdateLoading] = useState(false);
  const { mailTemplate, setMailTemplate, variables, subject, setSubject } =
    useFile();
  // console.log(variables);

  useEffect(() => {
    if (emailBodyRef.current) {
      const newEditor = new MediumEditor(emailBodyRef.current, {
        toolbar: {
          buttons: ["bold", "italic", "underline", "anchor", "strikethrough"],
        },
        placeholder: false,
      });

      if (mailTemplate) {
        console.log("18", mailTemplate);
        newEditor.setContent(mailTemplate);
        console.log("19", mailTemplate);
        setMailTemplate(mailTemplate); // Set the mailTemplate to the body
        console.log("21", mailTemplate);
      } else {
        newEditor.setContent("");
      }

      newEditor.subscribe("editableInput", () => {
        setMailTemplate(emailBodyRef.current.innerHTML);
      });

      emailBodyRef.current.medium = newEditor;
    }
  }, []);

  const [activePicker, setActivePicker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSelectionRange, setLastSelectionRange] = useState(null);

  const handlePickerSelection = (pickerName) => {
    setActivePicker((prevPicker) =>
      prevPicker === pickerName ? null : pickerName
    );
  };

  const insertVariable = (variable) => {
    if (!lastSelectionRange) {
      return; // No previous selection range, can't insert the variable
    }

    if (emailBodyRef.current && emailBodyRef.current.medium) {
      const mediumEditorElement = document.getElementById(
        "template_editor_update"
      );

      const selection = window.getSelection();

      // Check if the last selection range is still valid and within the "medium_editor" element
      if (
        mediumEditorElement.contains(lastSelectionRange.startContainer) &&
        mediumEditorElement.contains(lastSelectionRange.endContainer)
      ) {
        // Restore the last selection range
        selection.removeAllRanges();
        selection.addRange(lastSelectionRange);

        const variableText = `{{${variable}}}`;

        const node = document.createTextNode(variableText);

        // Replace the selected text with the variable
        lastSelectionRange.deleteContents();
        lastSelectionRange.insertNode(node);
      }
    }
    setActivePicker(null);
  };

  const handleEmojiClick = (emojiData) => {
    if (emailBodyRef.current && emailBodyRef.current.medium) {
      const mediumEditorElement = document.getElementById(
        "template_editor_update"
      );
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Check if the selection is within the "medium_editor" element
      if (
        mediumEditorElement.contains(range.startContainer) &&
        mediumEditorElement.contains(range.endContainer)
      ) {
        const emoji = emojiData.emoji;
        const node = document.createTextNode(emoji);

        // Replace the selected text with the emoji
        range.deleteContents();
        range.insertNode(node);
      }
    }
    setActivePicker(null);
  };

  const filteredVariables = variables.filter((variable) =>
    variable.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDocumentClick = (event) => {
    // Check if the click occurred outside the options container
    if (
      !event.target.closest(`.${styles.options}`) &&
      !event.target.closest(`.${styles.variable_picker}`) &&
      !event.target.closest(`.${styles.emoji_picker}`)
    ) {
      setActivePicker(null);
    }
  };

  const handleCursorChange = () => {
    // Save the current selection range to state when the cursor changes
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setLastSelectionRange(selection.getRangeAt(0));
    }
  };

  useEffect(() => {
    // document.addEventListener("click", handleDocumentClick);
    document.addEventListener("selectionchange", handleCursorChange);
    return () => {
      // document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("selectionchange", handleCursorChange);
    };
  }, []);

  return (
    <div className="flex flex-col w-full gap-2">
      <h5 className="font-bold text-xl">Subject</h5>
      <input
        className="input"
        value={subject}
        placeholder="Ex: Applcation for Post of ..."
        onChange={(e) => {
          setSubject(e.target.value);
        }}
      />
      <div className="w-full flex justify-between">
        <h5 className="font-bold text-xl">Body</h5>
        <div className={`flex items-center gap-4 relative`}>
          <div className="relative">
            <svg
              className="cursor-pointer h-5 w-5 text-gray-400"
              onClick={() => handlePickerSelection("emoji")}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M256 0C114.841 0 0 114.841 0 256s114.841 256 256 256 256-114.841 256-256S397.159 0 256 0zm0 480C132.486 480 32 379.514 32 256S132.486 32 256 32s224 100.486 224 224-100.486 224-224 224zm134.856-146c-27.973 48.445-78.385 77.368-134.852 77.369-56.469.001-106.884-28.922-134.859-77.369-4.419-7.652-1.798-17.438 5.854-21.856 7.654-4.419 17.439-1.797 21.856 5.854 22.191 38.429 62.247 61.372 107.148 61.371 44.899-.001 84.952-22.943 107.141-61.371 4.418-7.653 14.204-10.274 21.856-5.855 7.653 4.419 10.274 14.204 5.856 21.857zM118.678 192.943c0-17.652 14.361-32.014 32.014-32.014s32.014 14.361 32.014 32.014-14.361 32.014-32.014 32.014-32.014-14.361-32.014-32.014zm274.645 0c0 17.652-14.361 32.014-32.014 32.014s-32.014-14.361-32.014-32.014 14.361-32.014 32.014-32.014c17.652.001 32.014 14.362 32.014 32.014z"
                  fill="currentColor"
                  opacity="1"
                  className=""
                ></path>
              </g>
            </svg>
            {activePicker === "emoji" && (
              <div className="absolute right-0 top-[125%]">
                <EmojiPicker
                  previewConfig={{
                    showPreview: false,
                  }}
                  autoFocusSearch={true}
                  searchDisabled={true}
                  skinTonesDisabled={false}
                  suggestedEmojisMode={false}
                  height={200}
                  width={400}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <svg
              className="cursor-pointer h-6 w-6 text-gray-400"
              onClick={() => handlePickerSelection("variable")}
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              viewBox="0 0 24 24"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M19 21c-.1 0-.3 0-.4-.1-.5-.2-.8-.8-.5-1.3 2.4-5.7 2.4-10.4 0-15.2-.2-.5 0-1.1.4-1.3.5-.2 1.1 0 1.3.4 2.6 5.2 2.6 10.6 0 16.8 0 .5-.4.7-.8.7zM5 21c-.4 0-.8-.2-.9-.6-2.6-6.2-2.6-11.6 0-16.8.3-.5.9-.7 1.3-.5.5.3.7.9.5 1.3-2.4 4.7-2.4 9.4 0 15.2.2.5 0 1.1-.5 1.3-.1.1-.3.1-.4.1zm10-4h-1c-1.4 0-1.8-1.1-2.3-2.4-1 1.3-2.3 2.4-3.7 2.4-.6 0-1-.4-1-1s.4-1 1-1c.5 0 1.4-.5 2.9-2.6-.2-.4-.3-.8-.4-1.2-.2-.5-.4-1-.5-1.2H9c-.6 0-1-.4-1-1s.4-1 1-1h1c1.4 0 1.8 1 2.3 2.4C13.3 9.1 14.6 8 16 8c.6 0 1 .4 1 1s-.4 1-1 1c-.5 0-1.4.5-2.9 2.6.2.5.3.9.4 1.2.2.5.3 1 .5 1.2h1c.6 0 1 .4 1 1s-.4 1-1 1z"
                  fill="currentColor"
                  opacity="1"
                ></path>
              </g>
            </svg>
            {activePicker === "variable" && (
              <div className="min-w-52 absolute right-0 top-[125%] rounded-md flex flex-col cursor-pointer overflow-auto max-h-52 bg-white">
                <div className="w-full sticky top-0 p-2 pb-0 bg-white">
                  <input
                    type="text"
                    placeholder="Search variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input bg-white text-[#858585] border-gray-400 "
                  />
                </div>
                {filteredVariables.length === 0 ? (
                  <div className="flex items-center justify-center h-60 text-base font-bold text-[#858585] p-2">
                    No variables found
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 items-start text-base font-bold text-[#858585] p-2">
                    {filteredVariables.map((variable) => (
                      <button
                        className="hover:bg-[#f1f8ff] w-full px-2 py-1 rounded-lg text-left "
                        key={nanoid()}
                        onClick={() => insertVariable(variable.value)}
                      >
                        {variable.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="template_editor_update"
        className="input h-[400px] overflow-auto"
        ref={emailBodyRef}
        dir="ltr"
      />
    </div>
  );
};

export default Editor;
