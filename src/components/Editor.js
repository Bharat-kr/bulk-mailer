//TODO: Messedup clean every thing here
"use client";
import React, { useRef, useState, useEffect } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useFile } from "@/context/FileContext";
import EmojiPicker from "emoji-picker-react";
import variables from "@/utils/constants";

const Editor = () => {
  const emailBodyRef = useRef();
  const [updateLoading, setUpdateLoading] = useState(false);
  const { mailTemplate, setMailTemplate } = useFile();

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
    variable.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <input className="input" />
      <div className="w-full flex justify-between">
        <h5 className="font-bold text-xl">Body</h5>
        <div className={`flex items-center gap-4 relative`}>
          <div className="relative">
            <img
              src="https://picsum.photos/20"
              alt="emoji"
              className="cursor-pointer"
              onClick={() => handlePickerSelection("emoji")}
            />
            {activePicker === "emoji" && (
              <div className="absolute right-0 bottom-full">
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
            <img
              src="https://picsum.photos/20"
              alt="variable"
              className="cursor-pointer"
              onClick={() => handlePickerSelection("variable")}
            />
            {activePicker === "variable" && (
              <div className="min-w-52 absolute right-0 bottom-full py-3 px-5 flex flex-col cursor-pointer overflow-auto max-h-64">
                <input
                  type="text"
                  placeholder="Search variables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sticky top-0 input"
                />
                {filteredVariables.length === 0 ? (
                  <div className="flex items-center justify-center h-60">
                    No variables found
                  </div>
                ) : (
                  <div>
                    {filteredVariables.map((variable) => (
                      <button
                        key={variable.id}
                        onClick={() => insertVariable(variable.name)}
                      >
                        {variable.name}
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
        className="input"
        ref={emailBodyRef}
        dir="ltr"
      />
    </div>
  );
};

export default Editor;
