import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownToHtml = (message) => {
  return (
    <div className="my_markdown_widget">
      <ReactMarkdown>{message.payload}</ReactMarkdown>
    </div>
  );
};

export default MarkdownToHtml;
