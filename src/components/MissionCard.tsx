import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface MissionCardProps {
  icon: LucideIcon;
  title: string;
  points: number;
  progress?: number;
  total?: number;
  completed?: boolean;
}

const MissionCard = ({ icon: Icon, title, points, progress = 0, total = 1, completed = false }: MissionCardProps) => {
  const progressPercent = (progress / total) * 100;

  return (
    <div className={`bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border-2 transition-all hover:scale-[1.02] ${
      completed ? "border-secondary/50 bg-secondary/5" : "border-primary/20 hover:border-primary/40"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
          completed ? "bg-secondary" : "bg-gradient-to-br from-primary to-secondary"
        }`}>
          <Icon className="w-7 h-7 text-foreground" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-quicksand font-bold text-lg text-foreground mb-1">{title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-accent rounded-full text-xs font-quicksand font-semibold text-foreground">
              +{points} Points
            </span>
            {progress > 0 && (
              <span className="text-xs font-quicksand text-muted-foreground">
                {progress}/{total}
              </span>
            )}
          </div>
          
          {total > 1 && (
            <Progress value={progressPercent} className="h-2 mb-3" />
          )}
          
          <Button 
            className={`rounded-full font-quicksand font-semibold w-full ${
              completed 
                ? "bg-secondary hover:bg-secondary/90" 
                : "bg-primary hover:bg-primary/90"
            } text-foreground`}
            disabled={completed}
          >
            {completed ? "✓ Completed" : "Complete Mission"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
