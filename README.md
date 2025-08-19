# Goan Guide Bot

This is a chatbot designed to be an expert on the Entrepreneurs' Organization (EO) Goa chapter, acting as a virtual guide named Maria. It uses Google's Gemini LLM with a streaming API to provide fast, interactive responses.

## Tech Stack

This project is built with:

-   Vite
-   TypeScript
-   React
-   shadcn-ui
-   Tailwind CSS
-   Google Gemini
-   Vercel AI SDK

## Running Locally

To work locally, you'll need Node.js & npm installed.

Follow these steps:

```sh
# Step 1: Clone the repository.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd goan-guide-bot

# Step 3: Install dependencies.
npm i

# Step 4: Set up environment variables.
# Create a file named .env.local and add your Google API key.
# GOOGLE_API_KEY=your_google_api_key_here

# Step 5: Start the development server.
npm run dev
