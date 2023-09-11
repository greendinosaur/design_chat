import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { getLogger } from "../../lib/logUtil";

// this will respond to the chat messages sent through
async function chatRoute(req, res) {
  const user = req.session.user;
  const logger = getLogger("chatAPI");

  //user needs to be logged in to use the chat API
  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  const body = req.body;
  logger.info({ user: user.chatHandle, prompts: body });

  //hard code the response for now, need to call the API
  res.status(200).json({
    role: "bot",
    content: "a response from the bot to " + body.newPrompt,
    closeToTokenLimit: true,
  });

  //need error handling to be added, maybe send back a different response in the json
}

export default withIronSessionApiRoute(chatRoute, sessionOptions);
