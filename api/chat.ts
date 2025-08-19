// FILE: api/chat.ts

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, StreamingTextResponse } from 'ai';

// Import the knowledgeBase constant from our new TypeScript module.
import { knowledgeBase } from './content';

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

    const google = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
    
    const result = await streamText({
      model: google('models/gemini-1.5-flash'),
      system: systemPrompt,
      messages: messages,
    });

    // *** THE DEFINITIVE FIX ***
    // Instead of using result.toAIStreamResponse(), we manually create
    // the StreamingTextResponse from the raw text stream. This forces
    // the correct v3-compatible format and bypasses the environmental issue.
    return new StreamingTextResponse(result.textStream);

  } catch (error) {
    console.error("An error occurred in the chat API:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
}
