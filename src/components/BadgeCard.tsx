import { LucideIcon } from "lucide-react";

interface BadgeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BadgeCard = ({ icon: Icon, title, description }: BadgeCardProps) => {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border-2 border-primary/10 hover:border-primary/30 transition-all hover:scale-105 hover:shadow-[var(--shadow-float)] group">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-md group-hover:animate-bounce">
        <Icon className="w-8 h-8 text-foreground" />
      </div>
      <h3 className="font-quicksand font-bold text-lg text-foreground mb-2">{title}</h3>
      <p className="font-quicksand text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default BadgeCard;
