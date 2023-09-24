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
        model: process.env.OPENAI_API_MODEL
          ? process.env.OPENAI_API_MODEL
          : "gpt-3.5-turbo-16k",
      });
      console.log("open api raw response", completion);
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
      //answer: "*React-Markdown* is **Awesome** a default answer with no API",
      //answer:
      // "Certainly! Here's a high-level technical solution for designing a review system for a bicycle park:\n\n1. Front-end Development:\n   - Create a user-friendly web application or mobile app interface to gather reviews from users.\n   - Implement user authentication and authorization to ensure only registered users can write reviews.\n   - Design intuitive forms for users to rate and provide feedback on different aspects of the bicycle park, such as cleanliness, safety, amenities, etc.\n\n2. Back-end Development:\n   - Develop a server-side application using a programming language like Python, Java, or Node.js.\n   - Set up a database to store user information, reviews, ratings, and other relevant data.\n   - Implement APIs for user registration, login, and handling review submissions.\n   - Create API endpoints for retrieving reviews based on various criteria (e.g., park location, rating, date, etc.).\n\n3. Data Storage and Management:\n   - Choose an appropriate database system, such as MySQL, PostgreSQL, or MongoDB, for storing and managing review data.\n   - Define database schemas to organize user profiles, reviews, and related information.\n\n4. Review Analytics:\n   - Implement data analytics to gather insights from the reviews, such as average ratings, popular features, and common complaints.\n   - Visualize the data using charts or graphs, allowing park administrators to make data-driven decisions for improvements.\n\n5. Integration with Maps:\n   - Integrate the review system with maps (e.g., Google Maps or Mapbox) to display the bicycle park location.\n   - Allow users to search for parks in their desired areas, view park details, and access reviews directly from the map interface.\n\n6. Notifications and Reporting:\n   - Send notifications to users when their reviews are published or when there are updates regarding their reviews.\n   - Implement reporting features to allow users to flag inappropriate content or submit feedback regarding reviews that violate community guidelines.\n\n7. Maintenance and Scaling:\n   - Regularly update and maintain the system to fix bugs, add new features, and ensure security.\n   - Consider scalability requirements, such as handling increased user traffic and managing a growing database.\n\nRemember, this is a high-level overview. The actual technical implementation may vary based on your specific requirements, technology preferences, and available resources.",
      answer:
        "Certainly! Here's a high-level technical solution for designing a review system for a bicycle park:\n1. Front-end Development:\n - Create a user-friendly web application or mobile app interface to gather reviews from users.\n   - Implement user authentication and authorization to ensure only registered users can write reviews.\n  ",

      tokens: 500,
    };
  }
}
