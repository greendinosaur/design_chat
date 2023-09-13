import React from "react";
import { useState } from "react";
import fetchJson from "../lib/fetchJson";

import { createCustomMessage } from "react-chatbot-kit";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // this state variable is used to store the index of where the relevant chat to send to the server begins
  // is required as the user may decide to start again but wants to see the old chat in the window still

  const [startActiveChat, setStartActiveChat] = useState(1);

  const handleAIChat = async (newPrompt, prevMessages) => {
    // need to add error handling in case the server throws an error code.
    const body = {
      newPrompt: newPrompt,
      promptHistory: prevMessages
        .slice(startActiveChat)
        .filter((chat) => chat.type !== "quota"), //exclude the quote messages
    };

    // need to show some kind of loading message while waiting for the API to return
    const result = await fetchJson("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let newMessages = [];
    const botMessage = createChatBotMessage(result.content);
    newMessages.push(botMessage);

    // send a message to the bot if the quota is getting close
    if (result.closeToTokenLimit) {
      const quotaMessage = createCustomMessage(
        "Close to the API token limit.",
        "quota"
      );
      newMessages.push(quotaMessage);
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...newMessages],
    }));
  };

  const handleDelete = () => {
    //need to delete the full chat history
    //rest the counter also as now there is no history to show
    setState((prev) => ({
      messages: [],
    }));
    setStartActiveChat(0);
  };

  const handleStartAgain = (prevMessages) => {
    // keep the chat history but need to stop sending the whole history to the API
    // so keep track of where the user asked to start the chat again and ensure anything before this
    // is not sent to the server
    setStartActiveChat(prevMessages.length + 1); //need to add 1 to ignore the start again message
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleAIChat,
            handleDelete,
            handleStartAgain,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
