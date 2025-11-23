import { Camera, MapPin, Award, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import rosyLogo from "@/assets/rosy-logo.png";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to view your profile");
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Load profile data
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setProfile(profileData);
    } catch (error: any) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse" />
          <p className="font-quicksand text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  const level = profile?.level || 1;
  const bubblePoints = profile?.bubble_points || 0;
  const trashCollected = profile?.trash_collected || 0;
  const dayStreak = profile?.day_streak || 0;
  const username = profile?.username || user?.email?.split("@")[0] || "User";
  
  // Calculate level progress (100 points per level)
  const pointsForNextLevel = level * 100;
  const currentLevelPoints = bubblePoints % 100;
  const levelProgress = (currentLevelPoints / pointsForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-2">
                <img 
                  src={profile?.avatar_url || rosyLogo} 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="font-quicksand font-bold text-3xl text-foreground mb-2">@{username}</h1>
              <p className="font-quicksand text-muted-foreground mb-4">Eco Hero Level {level} 🌟</p>
              
              <div className="bg-muted rounded-2xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-quicksand font-semibold text-foreground">Level Progress</span>
                  <span className="font-quicksand text-sm text-muted-foreground">{Math.round(levelProgress)}%</span>
                </div>
                <Progress value={levelProgress} className="h-3" />
                <p className="text-xs text-muted-foreground font-quicksand mt-2">
                  {currentLevelPoints}/{pointsForNextLevel} points to level {level + 1}
                </p>
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
            { icon: MapPin, value: trashCollected.toString(), label: "Trash Collected", color: "from-primary to-secondary" },
            { icon: Award, value: bubblePoints.toString(), label: "Bubble Points", color: "from-accent to-secondary" },
            { icon: TrendingUp, value: `#${Math.max(1, 100 - trashCollected)}`, label: "Global Ranking", color: "from-secondary to-primary" },
            { icon: Calendar, value: dayStreak.toString(), label: "Day Streak", color: "from-accent to-primary" },
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
              { emoji: "🌱", name: "Newbie", unlocked: true },
              { emoji: "♻️", name: "Recycler", unlocked: trashCollected >= 5 },
              { emoji: "🌍", name: "Planet Hero", unlocked: trashCollected >= 10 },
              { emoji: "⚡", name: "Speed Star", unlocked: dayStreak >= 3 },
              { emoji: "🎯", name: "Achiever", unlocked: bubblePoints >= 50 },
              { emoji: "👑", name: "Champion", unlocked: trashCollected >= 20 },
            ].map((badge, index) => (
              <div 
                key={index} 
                className={`bg-gradient-to-br rounded-2xl p-4 text-center border-2 transition-all hover:scale-110 ${
                  badge.unlocked 
                    ? "from-primary/20 to-secondary/20 border-primary/20 hover:border-primary/40" 
                    : "from-muted/50 to-muted/50 border-muted opacity-50"
                }`}
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
          {trashCollected === 0 ? (
            <div className="text-center py-8">
              <p className="font-quicksand text-muted-foreground">No activity yet. Start scanning trash to earn points!</p>
              <Button 
                onClick={() => navigate("/scan")}
                className="mt-4 rounded-full bg-gradient-to-r from-primary to-secondary font-quicksand font-bold"
              >
                Start Scanning
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                <div>
                  <p className="font-quicksand font-medium text-foreground">Joined ROSY</p>
                  <p className="font-quicksand text-sm text-muted-foreground">Welcome aboard!</p>
                </div>
                <span className="px-3 py-1 bg-accent rounded-full font-quicksand font-bold text-foreground">
                  +10
                </span>
              </div>
              {trashCollected > 0 && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                  <div>
                    <p className="font-quicksand font-medium text-foreground">Scanned {trashCollected} item{trashCollected > 1 ? 's' : ''}</p>
                    <p className="font-quicksand text-sm text-muted-foreground">Keep up the great work!</p>
                  </div>
                  <span className="px-3 py-1 bg-accent rounded-full font-quicksand font-bold text-foreground">
                    +{bubblePoints}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;