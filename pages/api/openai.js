import OpenAI from "openai";

export async function answerPrompt(messages) {
  //use the environment variable to turn off the API to save the token usage
  console.log(process.env.TOGGLE_API_ON);
  console.log(process.env.TOGGLE_API_ON === "true");
  if (process.env.TOGGLE_API_ON === "true") {
    try {
      console.log("Calling OpenAI");
      const openai = new OpenAI({
        apiKey: process.env["OPENAI_API_KEY"],
      });
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      return {
        answer: completion.choices[0].message.content,
        tokens: completion.usage.total_tokens,
      };
    } catch (e) {
      //if an error occurs log it
      console.log("error: ", e);
      return {
        errorMsg: "An error in the OpenAPI has occured.",
      };
    }
  } else {
    //return some default text if the API is turned off
    return {
      answer: "*React-Markdown* is **Awesome** a default answer with no API",
      tokens: 100,
    };
  }
}
