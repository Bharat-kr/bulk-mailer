import React from "react";

const Editor = () => {
  const [content, setContent] = React.useState("<Html lang='en'></Html");
  return (
    <div className="w-full border border-1 rounded-2xl border-blue-500 p-4 flex">
      <div className="w-1/2">
      
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default Editor;
