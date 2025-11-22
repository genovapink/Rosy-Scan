import { Recycle, Trash2, MapPin, LeafyGreen, Droplets, Trees } from "lucide-react";
import MissionCard from "@/components/MissionCard";

const Missions = () => {
  const dailyMissions = [
    {
      icon: Recycle,
      title: "Pick up 1 plastic bottle",
      points: 5,
      progress: 0,
      total: 1,
    },
    {
      icon: Trash2,
      title: "Throw paper to bin",
      points: 3,
      progress: 1,
      total: 1,
      completed: true,
    },
    {
      icon: MapPin,
      title: "Clean small area",
      points: 10,
      progress: 0,
      total: 1,
    },
    {
      icon: LeafyGreen,
      title: "Collect 5 pieces of trash",
      points: 15,
      progress: 2,
      total: 5,
    },
    {
      icon: Droplets,
      title: "Pick up wet waste",
      points: 8,
      progress: 0,
      total: 1,
    },
    {
      icon: Trees,
      title: "Clean park area",
      points: 20,
      progress: 0,
      total: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-quicksand font-bold text-4xl md:text-5xl text-foreground mb-4">
            Daily Missions 📋
          </h1>
          <p className="font-quicksand text-lg text-muted-foreground">
            Complete missions to earn Bubble Points and help Rosy!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {dailyMissions.map((mission, index) => (
            <div key={index} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in">
              <MissionCard {...mission} />
            </div>
          ))}
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-accent/30">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-md">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <h2 className="font-quicksand font-bold text-2xl text-foreground">Weekly Challenge</h2>
              <p className="font-quicksand text-muted-foreground">Collect 50 pieces of trash this week</p>
            </div>
          </div>
          <div className="bg-background/50 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-quicksand font-semibold text-foreground">Progress: 23/50</span>
              <span className="px-3 py-1 bg-accent rounded-full text-sm font-quicksand font-bold text-foreground">
                +100 Points
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full" style={{ width: "46%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
