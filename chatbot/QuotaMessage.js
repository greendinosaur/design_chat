const QuotaMessage = (message) => {
  let response =
    "This chat is getting too long. We recommend to start agin by entering START AGAIN";

  return (
    <div className="">
      <b>{response}</b>
    </div>
  );
};

export default QuotaMessage;
