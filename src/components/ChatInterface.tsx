import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "./ChatMessage";
import { Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Olá! I'm Maria from Goa! 🌴 I'm here to help you learn everything about EO Goa - our entrepreneurial community, events, members, and all things related to our beautiful organization. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMariaResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('olá')) {
      return "Olá! Welcome to EO Goa! I'm so excited to chat with you. How can I help you learn about our amazing entrepreneurial community today? 😊";
    }
    
    if (message.includes('eo goa') || message.includes('entrepreneurs organization')) {
      return "EO Goa is part of the global Entrepreneurs' Organization - a vibrant community of successful entrepreneurs here in beautiful Goa! We support each other through learning, networking, and giving back to our community. We have regular events, workshops, and social gatherings. What specifically would you like to know about EO Goa?";
    }
    
    if (message.includes('member') || message.includes('join')) {
      return "EO Goa membership is for entrepreneurs who own a business generating at least $1M in annual revenue. Our members are diverse - from tech innovators to hospitality moguls, all passionate about growth and giving back! The application process involves meeting our criteria and getting endorsed by current members. Would you like to know more about the benefits or application process?";
    }
    
    if (message.includes('event') || message.includes('meeting')) {
      return "We have amazing events throughout the year! Monthly learning sessions, networking dinners, annual retreats, and special celebrations. Our events often showcase Goa's beautiful venues - from beachside gatherings to heritage properties. We also participate in global EO events. Are you interested in a specific type of event?";
    }
    
    if (message.includes('birthday') || message.includes('celebration')) {
      return "We love celebrating our members! Birthday celebrations are special occasions where the EO Goa family comes together. These are usually intimate gatherings that showcase our close-knit community spirit. If you're looking for specific member birthday information, I'd recommend reaching out to our chapter directly for privacy reasons. 🎉";
    }
    
    if (message.includes('goa') || message.includes('local')) {
      return "Goa is such a special place for entrepreneurs! Our unique blend of Portuguese heritage, Indian culture, and coastal lifestyle creates an inspiring environment for business and creativity. Many of our events leverage Goa's natural beauty - from beach resorts to spice plantations. The relaxed Goan lifestyle perfectly balances the intensity of entrepreneurship! 🏖️";
    }
    
    if (message.includes('contact') || message.includes('how to reach')) {
      return "You can connect with EO Goa through our official channels! I'd recommend reaching out through the global EO website or connecting with current members on LinkedIn. Our chapter is very welcoming to potential members and partners who align with our values of trust, respect, and authenticity.";
    }
    
    return "That's a great question! As your EO Goa guide, I'm here to help with information about our entrepreneurial community, events, membership, and Goa's amazing business environment. Could you tell me more specifically what you'd like to know about EO Goa? I'm excited to share more! 🌴";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate Maria typing
    setTimeout(() => {
      const mariaResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMariaResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, mariaResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
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

      {/* Input Area */}
      <div className="border-t bg-background/95 backdrop-blur-sm p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Maria about EO Goa..."
            className="flex-1 rounded-full border-primary/20 focus:border-primary"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};