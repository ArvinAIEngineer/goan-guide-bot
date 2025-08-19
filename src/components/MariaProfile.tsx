import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar } from "lucide-react";
import mariaAvatar from "@/assets/maria-avatar.jpg";

export const MariaProfile = () => {
  return (
    <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-xl p-6 border border-primary/20 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 border-3 border-primary/30 shadow-lg">
          <AvatarImage src={mariaAvatar} alt="Maria" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">M</AvatarFallback>
        </Avatar>
        
        <div>
          <h2 className="text-xl font-bold text-foreground">Maria Fernandes</h2>
          <p className="text-muted-foreground">EO Goa Expert & Local Guide</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-primary">
            <MapPin className="w-4 h-4" />
            <span>Panaji, Goa</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Olá! I'm Maria, your friendly Goan guide who knows everything about EO Goa. 
        Ask me about our amazing entrepreneurial community, upcoming events, member details, 
        or anything about beautiful Goa! 🌴
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="text-xs">
          <Users className="w-3 h-3 mr-1" />
          EO Goa Expert
        </Badge>
        <Badge variant="outline" className="text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          Event Coordinator
        </Badge>
        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
          Goa Native
        </Badge>
      </div>
    </div>
  );
};