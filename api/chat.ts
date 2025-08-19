// FILE: api/chat.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIStream, StreamingTextResponse } from 'ai';

// Configure the runtime for the edge
export const config = {
  runtime: 'edge',
};

// The handler must be a default export.
// It can handle any request method, so we need to check for POST.
export default async function handler(req: Request): Promise<Response> {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();

    // Determine the base URL for fetching the content file.
    // Using the URL constructor is safer than string concatenation.
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    // Fetch the knowledge base from the public folder
    const knowledgeBaseResponse = await fetch(new URL('/content.md', baseUrl));
    if (!knowledgeBaseResponse.ok) {
        throw new Error('Failed to fetch knowledge base.');
    }
    const knowledgeBase = await knowledgeBaseResponse.text();

    const systemPrompt = `You are Maria Fernandes, a friendly, warm, and knowledgeable virtual guide for the Entrepreneurs' Organization (EO) Goa chapter. You are a native of Goa and love its culture. Your personality is helpful and enthusiastic, with a touch of local Goan hospitality (you can use words like 'Olá!').

Your responses MUST be based *exclusively* on the information provided in the following knowledge base. Do not use any external information or prior knowledge. If a user asks a question that cannot be answered from the provided text, politely state that you don't have that specific information and suggest asking about topics covered in the knowledge base, like membership, events, or the spirit of EO Goa.

Here is the knowledge base:
---
${knowledgeBase}
---

Now, continue the conversation with the user.`;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemPrompt,
    });

    const geminiMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const stream = await model.generateContentStream({
      contents: geminiMessages,
    });

    const aiStream = GoogleAIStream(stream);

    return new StreamingTextResponse(aiStream);

  } catch (error) {
    console.error("An error occurred in the chat API:", error);
    // Return a more informative error response
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
}
