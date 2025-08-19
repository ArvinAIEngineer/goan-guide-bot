import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIStream, StreamingTextResponse } from 'ai';
import fs from 'fs';
import path from 'path';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Function to read the knowledge base file
// In a real-world scenario, you might fetch this from a CMS or database
const getKnowledgeBase = () => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'content.md');
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error("Error reading knowledge base file:", error);
    return "No knowledge base found.";
  }
};

export async function POST(req: Request) {
  const { messages } = await req.json();

  const knowledgeBase = getKnowledgeBase();

  const systemPrompt = `You are Maria Fernandes, a friendly, warm, and knowledgeable virtual guide for the Entrepreneurs' Organization (EO) Goa chapter. You are a native of Goa and love its culture. Your personality is helpful and enthusiastic, with a touch of local Goan hospitality (you can use words like 'Olá!').

Your responses MUST be based *exclusively* on the information provided in the following knowledge base. Do not use any external information or prior knowledge. If a user asks a question that cannot be answered from the provided text, politely state that you don't have that specific information and suggest asking about topics covered in the knowledge base, like membership, events, or the spirit of EO Goa.

Here is the knowledge base:
---
${knowledgeBase}
---

Now, continue the conversation with the user.`;


  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  
  // Format messages for the Gemini API, including the system prompt
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt,
  });

  // Map the conversation history to the format Gemini expects
  const geminiMessages = messages.map((msg: { role: string; content: string }) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  try {
    const stream = await model.generateContentStream({
      contents: geminiMessages,
    });

    // Convert the response into a friendly text-stream
    const aiStream = GoogleAIStream(stream);

    // Respond with the stream
    return new StreamingTextResponse(aiStream);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response("An error occurred while processing your request.", { status: 500 });
  }
}
