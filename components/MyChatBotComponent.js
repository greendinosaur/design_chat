import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config.js";
import MessageParser from "../chatbot/MessageParser.js";
import ActionProvider from "../chatbot/ActionProvider.js";

export const MyChatBotComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        placeholderText="Please enter your prompt. Enter DELETE to delete all history and start again. Enter START AGAIN to start again but keep the chat history."
      />
    </div>
  );
};
