# Design Chat

Design Chat is a simple chat app that allows a single user to chat with the OpenAI ChatGPT API. All of the user prompts and ChatGPT responses are logged to enable an audit trail of the conversation. 

Currently, it is not plugged into ChatGPT.

Only authorized users are able to access the chat. These are simply encoded in an environment variable.

## Usage

To use, first clone this project.

Create a `.env.local` file in the root directory of the project and set the following environment variables. These are needed for the basic login to work.
```
SESSION_PASSWORD="SOME UNIQUE PASSWORD"
ALLOWED_USERS=[an array of user names] e.g ["MoonStar", "BrightLight"]
```

Install the node dependencies from the package.json file:
`npm install`

To run the app locally:
`npm run dev`

To run under Docker
`docker build -t design-chat .`

`docker run -p 3000:3000 --name design-chat design-chat`

The outputs of the chat are logged to the stdout, to view these when running under a docker container can use
`docker logs -f design-chat &> output.log &`

When running locally or using the Docker file, the site is accessible at http://localhost:3000


## Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

## Acknowledgements
This app is built using the [nextjs](https://nextjs.org/) framework.

The app makes heavy use of the [react-chatbot-kit](https://fredrikoseberg.github.io/react-chatbot-kit-docs/) for the chatbot element so kudos to the folks who developed it.

## License

[MIT](https://choosealicense.com/licenses/mit/)


