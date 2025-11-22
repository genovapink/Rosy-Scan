import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import rosyLogo from "@/assets/rosy-character.png";
import { Button } from "@/components/ui/button";

const FloatingRosy = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[var(--shadow-float)] hover:scale-110 transition-transform animate-float"
      >
        <img src={rosyLogo} alt="Rosy Assistant" className="w-full h-full object-cover p-2" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-card rounded-3xl shadow-[var(--shadow-card)] border-2 border-primary/20 animate-scale-in">
          <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={rosyLogo} alt="Rosy" className="w-10 h-10 rounded-full bg-background p-1" />
              <div>
                <p className="font-quicksand font-bold text-foreground">Rosy</p>
                <p className="text-xs text-foreground/70">Your Eco Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full hover:bg-background/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            <div className="bg-muted rounded-2xl rounded-tl-sm p-3 animate-fade-in">
              <p className="font-quicksand text-sm text-foreground">
                Hi! Aku Rosy. Mau mulai bersih-bersih hari ini? 🌱
              </p>
            </div>
            
            <div className="bg-muted rounded-2xl rounded-tl-sm p-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <p className="font-quicksand text-sm text-foreground">
                Ayo scan sampah di sekitarmu dan kumpulkan Bubble Points! ✨
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-quicksand">
                <MessageCircle className="w-4 h-4 mr-1" />
                Start Mission
              </Button>
              <Button variant="outline" className="rounded-full font-quicksand">
                View Tips
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingRosy;
