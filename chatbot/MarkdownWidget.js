import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownToHtml = (message) => {
  return (
    <div className="my_markdown_widget">
      <div className="flex flex-row justify-between">
        <div>
          <ReactMarkdown>{message.payload.content}</ReactMarkdown>
        </div>
        <div className="token_info">
          <p>{message.payload.tokens}/{message.payload.token_limit}</p>
          <p>{message.payload.token_limit - message.payload.tokens} tokens remaining</p>
        </div>
      </div>
    
    </div>
  );
};

export default MarkdownToHtml;
