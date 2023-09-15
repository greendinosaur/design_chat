import React from "react";
import { useState } from "react";
import fetchJson from "../lib/fetchJson";

import { createCustomMessage } from "react-chatbot-kit";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // this state variable is used to store the index of where the relevant chat to send to the server begins
  // is required as the user may decide to start again but wants to see the old chat in the window still
  const [startActiveChat, setStartActiveChat] = useState(1);

  const handleAIChat = async (newPrompt, prevMessages) => {
    try {
      const body = {
        newPrompt: newPrompt,
        promptHistory: prepareData(prevMessages),
      };

      // show a loading message while the API is being called as it may take some time to return
      const holdingMessage = createCustomMessage("...", "loader", {
        payload: "LOADER",
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, holdingMessage],
      }));

      // fetchJson will throw an error if a response code other than 2xx is returned from the API call
      const result = await fetchJson("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let newMessages = [];

      const botMessage = createChatBotMessage("", {
        widget: "markdownToHtml",
        payload: result.content,
      });

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
        messages: [
          ...prev.messages.filter((message) => message.type !== "loader"),
          ...newMessages,
        ],
      }));
    } catch (e) {
      showErrorMessage(e);
    }
  };

  const showErrorMessage = (e) => {
    // show an error message to the user
    console.log("An error has occured", e);
    const errorMessage = createCustomMessage("...", "error", {
      payload: "ERROR",
    });

    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages.filter((message) => message.type !== "loader"), //error may have occured after the loader has been shown so remove it
        errorMessage,
      ],
    }));
  };

  // need to filter out any custom quota messages
  // and also show the actual response from the API which is stored in payload on the
  // custom messages
  const prepareData = (messages) => {
    const filterMessages = messages
      .slice(startActiveChat)
      .filter((chat) => !["quota", "loader", "error"].includes(chat.type)); //exclude the custom messages from the API

    //now set the messages to the right json values
    const mapMessages = filterMessages.map(setMessage);
    console.log(mapMessages);

    return mapMessages;
  };

  // if the messages is blank (which will be for the markdown widget)
  // then use the payload text instead
  const setMessage = (message) => {
    let messageText = message.message;
    if (messageText.length == 0) {
      messageText = message.payload;
    }
    return { message: messageText, type: message.type };
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
