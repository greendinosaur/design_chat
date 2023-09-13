import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { getLogger } from "../../lib/logUtil";
import { answerPrompt } from "./openai";

// this will respond to the chat messages sent through
async function chatRoute(req, res) {
  const user = req.session.user;
  const logger = getLogger("chatAPI");
  const TOKEN_LIMIT = process.env.TOKEN_LIMIT ? process.env.TOKEN_LIMIT : 3500;

  //user needs to be logged in to use the chat API
  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  const body = req.body;
  logger.info({ user: user.chatHandle, prompts: body });

  let messages = [{ role: "user", content: body.newPrompt }];
  if (body.promptHistory) {
    const history = body.promptHistory.map(({ type, message }) => ({
      role: type === "user" ? "user" : "assistant", //map onto the roles the API expects
      content: message,
    }));
    messages = [...history, ...messages];
  }

  const result = await answerPrompt(messages);
  logger.info({
    user: user.chatHandle,
    response: result.answer,
    tokens: result.tokens,
  });

  if (result.answer?.length > 0) {
    res.status(200).json({
      role: "bot",
      content: result.answer,
      closeToTokenLimit: result.tokens > TOKEN_LIMIT,
    });
  } else {
    //an error has occured, send back as the response
    //likely need something more sophisticated
    logger.error({
      user: user.chatHandle,
      response: result.errorMsg,
    });

    res.status(200).json({
      role: "bot",
      content: result.errorMsg,
    });
  }
}

export default withIronSessionApiRoute(chatRoute, sessionOptions);
