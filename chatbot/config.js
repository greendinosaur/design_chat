import { createChatBotMessage, createCustomMessage } from "react-chatbot-kit";
import QuotaMessage from "./QuotaMessage";
import MarkdownToHtml from "./MarkdownWidget";

const botName = "The Design Challenge Bot";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ready to help you design software.`),
  ],
  botName: botName,
  customMessages: {
    quota: (props) => <QuotaMessage {...props} />,
  },
  widgets: [
    {
      widgetName: "markdownToHtml",
      widgetFunc: (props) => <MarkdownToHtml {...props} />,
      props: ["message"],
    },
  ],
};

export default config;
