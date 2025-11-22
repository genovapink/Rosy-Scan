import { Camera, MapPin, Award, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import rosyLogo from "@/assets/rosy-character.png";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-2">
                <img src={rosyLogo} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="font-quicksand font-bold text-3xl text-foreground mb-2">@genova</h1>
              <p className="font-quicksand text-muted-foreground mb-4">Eco Hero Level 12 🌟</p>
              
              <div className="bg-muted rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-quicksand font-semibold text-foreground">Level Progress</span>
                  <span className="font-quicksand text-sm text-muted-foreground">72%</span>
                </div>
                <Progress value={72} className="h-3" />
              </div>

              <div className="flex gap-3 justify-center md:justify-start">
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-foreground font-quicksand">
                  Edit Profile
                </Button>
                <Button variant="outline" className="rounded-full font-quicksand">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: MapPin, value: "234", label: "Trash Cleaned", color: "from-primary to-secondary" },
            { icon: Award, value: "450", label: "Bubble Points", color: "from-accent to-secondary" },
            { icon: TrendingUp, value: "#47", label: "Global Ranking", color: "from-secondary to-primary" },
            { icon: Calendar, value: "15", label: "Day Streak", color: "from-accent to-primary" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-card rounded-3xl p-6 shadow-[var(--shadow-card)] border-2 border-primary/20 text-center hover:scale-105 transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-md`}>
                <stat.icon className="w-7 h-7 text-foreground" />
              </div>
              <p className="font-quicksand font-bold text-3xl text-foreground mb-1">{stat.value}</p>
              <p className="font-quicksand text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges Collection */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20 mb-8">
          <h2 className="font-quicksand font-bold text-2xl text-foreground mb-6">My Badges 🏆</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { emoji: "🌱", name: "Newbie" },
              { emoji: "♻️", name: "Recycler" },
              { emoji: "🌍", name: "Planet Hero" },
              { emoji: "⚡", name: "Speed Star" },
              { emoji: "🎯", name: "Achiever" },
              { emoji: "👑", name: "Champion" },
            ].map((badge, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 text-center border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-110"
              >
                <div className="text-4xl mb-2">{badge.emoji}</div>
                <p className="font-quicksand text-xs font-semibold text-foreground">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20">
          <h2 className="font-quicksand font-bold text-2xl text-foreground mb-6">Recent Activity 📝</h2>
          <div className="space-y-4">
            {[
              { action: "Completed mission: Pick up 1 plastic bottle", points: "+5", time: "2 hours ago" },
              { action: "Earned badge: Planet Hero", points: "+50", time: "1 day ago" },
              { action: "Cleaned park area", points: "+20", time: "2 days ago" },
              { action: "Reached Level 12", points: "+100", time: "3 days ago" },
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-muted rounded-2xl hover:bg-primary/10 transition-all"
              >
                <div>
                  <p className="font-quicksand font-medium text-foreground">{activity.action}</p>
                  <p className="font-quicksand text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <span className="px-3 py-1 bg-accent rounded-full font-quicksand font-bold text-foreground">
                  {activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
