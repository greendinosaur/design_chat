import React from "react";
import { useState } from "react";
import fetchJson from "../lib/fetchJson";

import { createCustomMessage } from "react-chatbot-kit";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  // this state variable is used to store the index of where the relevant chat to send to the server begins
  // is required as the user may decide to start again but wants to see the old chat in the window still

  const [startActiveChat, setStartActiveChat] = useState(1);

  const handleAIChat = async (newPrompt, prevMessages) => {
    console.log(prevMessages);
    // need to add error handling in case the server throws an error code.
    const body = {
      newPrompt: newPrompt,
      promptHistory: prepareData(prevMessages),
    };

    // need to show some kind of loading message while waiting for the API to return
    const result = await fetchJson("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let newMessages = [];

    const holdingMessage = createCustomMessage("...", "quota", {
      payload: "LOADER",
    });

    addMessagesToState([holdingMessage], false);

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
        ...prev.messages.filter((message) => message.type !== "quota"),
        ...newMessages,
      ],
    }));
  };

  // need to filter out any custom quota messages
  // and also show the actual response from the API which is stored in payload on the
  // custom messages
  const prepareData = (messages) => {
    const filterMessages = messages
      .slice(startActiveChat)
      .filter((chat) => chat.type !== "quota"); //exclude the quote messages

    //now set the messages to the right json values
    const mapMessages = filterMessages.map(setMessage);

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

  const removeLoadingMessage = (prevstateArray, removeLoading) => {
    if (removeLoading) {
      prevstateArray?.messages?.splice(
        prevstateArray?.messages?.findIndex(
          (a) => a?.message?.message === "DUMMY_MESSAGE"
        ),
        1
      );
      return prevstateArray;
    } else {
      return prevstateArray;
    }
  };

  const addMessagesToState = (messages, removeLoading = false) => {
    setState((prevstate) => ({
      ...removeLoadingMessage(prevstate, removeLoading),
      messages: [...prevstate.messages, ...messages],
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
