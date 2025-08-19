// FILE: api/chat.ts

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Import the raw text content of the markdown file at build time.
// This is the most efficient and reliable way to access the file content.
import knowledgeBase from './content.md?raw';

// Configure the runtime for the edge
export const config = {
  runtime: 'edge',
};

// The handler must be a default export.
export default async function handler(req: Request): Promise<Response> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    const systemPrompt = `You are Maria Fernandes, a friendly, warm, and knowledgeable virtual guide for the Entrepreneurs' Organization (EO) Goa chapter. You are a native of Goa and love its culture. Your personality is helpful and enthusiastic, with a touch of local Goan hospitality (you can use words like 'Olá!').

Your responses MUST be based *exclusively* on the information provided in the following knowledge base. Do not use any external information or prior knowledge. If a user asks a question that cannot be answered from the provided text, politely state that you don't have that specific information and suggest asking about topics covered in the knowledge base, like membership, events, or the spirit of EO Goa.

Here is the knowledge base:
---
${knowledgeBase}
---

Now, continue the conversation with the user.`;

    // Instantiate the Google provider using the createGoogleGenerativeAI factory
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
    
    // Call the streamText helper with the model, system prompt, and messages
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages: messages,
    });

    // Respond with the stream using the built-in Vercel AI SDK response helper
    return result.toAIStreamResponse();

  } catch (error) {
    console.error("An error occurred in the chat API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
}
