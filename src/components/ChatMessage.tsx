// FILE: src/components/ChatMessage.tsx

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import mariaAvatar from "@/assets/maria-avatar-ai-style.jpg";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  // The 'timestamp' prop is removed as useChat doesn't provide it by default.
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <Avatar className="w-10 h-10 border-2 border-primary/20">
          <AvatarImage src={mariaAvatar} alt="Maria" />
          <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[80%] text-left ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-2 shadow-sm ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-card text-card-foreground border rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        
        {/* Timestamp display is removed */}
      </div>
      
      {isUser && (
        <Avatar className="w-10 h-10 bg-secondary">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
            You
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
