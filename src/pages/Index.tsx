import { MariaProfile } from "@/components/MariaProfile";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌴</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Chat with Maria</h1>
              <p className="text-sm text-muted-foreground">Your EO Goa Expert from Goa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <MariaProfile />
            
            {/* Quick Tips */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span>
                Ask Maria About:
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• EO Goa membership details</p>
                <p>• Upcoming events & meetings</p>
                <p>• Member information</p>
                <p>• Goa entrepreneurial scene</p>
                <p>• How to get involved</p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border shadow-sm h-full flex flex-col overflow-hidden">
              <ChatInterface />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Index;
