// FILE: src/components/ChatInterface.tsx

import { useRef, useEffect } from "react";
import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

export const ChatInterface = () => {
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // The useChat hook handles all the logic for you.
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    // The initial messages will be rendered on first load.
    initialMessages: [
      {
        id: '1',
        // The role for the AI's messages is 'assistant'.
        role: 'assistant',
        content: "Olá! I'm Maria from Goa! 🌴 I'm here to help you learn everything about EO Goa - our entrepreneurial community, events, members, and all things related to our beautiful organization. What would you like to know?",
      }
    ],
    // The API route that the hook will call.
    api: '/api/chat',
    // This function will be called if the API returns an error.
    onError: (err) => {
      console.error("Chat error:", err);
      toast({
        title: "Error",
        description: "Failed to get a response. Please check your connection or API key.",
        variant: "destructive",
      });
    },
  });

  // Automatically scroll to the bottom when new messages are added.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUser={message.role === 'user'}
            />
          ))}
          
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-2 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur-sm p-4">
        {/* The handleSubmit function from useChat handles form submission */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input} // The input state is managed by useChat
            onChange={handleInputChange} // The change handler is provided by useChat
            placeholder="Ask Maria about EO Goa..."
            className="flex-1 rounded-full border-primary/20 focus:border-primary"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
