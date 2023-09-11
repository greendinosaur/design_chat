import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import QuotaMessage from "./QuotaMessage";

const botName = "The Design Challenge Bot";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ready to help you design software.`),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  customMessages: {
    quota: (props) => <QuotaMessage {...props} />,
  },
};

export default config;
