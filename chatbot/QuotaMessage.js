const QuotaMessage = (message) => {
  let response =
    "This chat is getting too long. Please ask to summarize the chat or start again.";

  return <div className="font-bold">{response}</div>;
};

export default QuotaMessage;
