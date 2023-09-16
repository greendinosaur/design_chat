import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownToHtml = (message) => {
  console.log("mmarkdown", message)
  return (
    <div className="my_markdown_widget">
      <div className="flex flex-row justify-between">
        <div className="w-4/5">
          <ReactMarkdown>{message.payload.content}</ReactMarkdown>
        </div>
        <div>
          <p>{message.payload.tokens}/{message.payload.token_limit}</p>
          <p>{message.payload.token_limit - message.payload.tokens} tokens remaining</p>
        </div>
      </div>
    
    </div>
  );
};

export default MarkdownToHtml;
