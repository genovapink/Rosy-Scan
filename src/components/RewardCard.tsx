import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RewardCardProps {
  icon: LucideIcon;
  title: string;
  cost: number;
  description: string;
  unlocked?: boolean;
}

const RewardCard = ({ icon: Icon, title, cost, description, unlocked = true }: RewardCardProps) => {
  return (
    <div className={`bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border-2 transition-all hover:scale-105 ${
      unlocked ? "border-primary/20 hover:border-primary/40" : "border-muted opacity-60"
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md ${
          unlocked ? "bg-gradient-to-br from-accent to-secondary" : "bg-muted"
        }`}>
          <Icon className="w-10 h-10 text-foreground" />
        </div>
        
        <h3 className="font-quicksand font-bold text-lg text-foreground mb-2">{title}</h3>
        <p className="font-quicksand text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-4 py-1.5 bg-primary rounded-full text-sm font-quicksand font-bold text-foreground">
            {cost} Points
          </span>
        </div>
        
        <Button 
          className="rounded-full font-quicksand font-semibold w-full bg-secondary hover:bg-secondary/90 text-foreground"
          disabled={!unlocked}
        >
          {unlocked ? "Claim Reward" : "🔒 Locked"}
        </Button>
      </div>
    </div>
  );
};

export default RewardCard;
