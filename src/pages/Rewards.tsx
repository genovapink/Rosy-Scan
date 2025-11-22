import { Gift, Award, Crown, Star, Heart, Sparkles } from "lucide-react";
import RewardCard from "@/components/RewardCard";

const Rewards = () => {
  const rewards = [
    {
      icon: Gift,
      title: "Rosy Sticker Pack",
      cost: 50,
      description: "Cute sticker collection of Rosy",
      unlocked: true,
    },
    {
      icon: Award,
      title: "Bronze Badge",
      cost: 100,
      description: "Show off your eco-hero status",
      unlocked: true,
    },
    {
      icon: Star,
      title: "Silver Badge",
      cost: 250,
      description: "Exclusive silver eco badge",
      unlocked: true,
    },
    {
      icon: Crown,
      title: "Gold Badge",
      cost: 500,
      description: "Ultimate eco-warrior badge",
      unlocked: false,
    },
    {
      icon: Heart,
      title: "Custom Eco-Avatar",
      cost: 300,
      description: "Personalize your Rosy avatar",
      unlocked: true,
    },
    {
      icon: Sparkles,
      title: "Premium Rosy Theme",
      cost: 400,
      description: "Unlock special UI themes",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-quicksand font-bold text-4xl md:text-5xl text-foreground mb-4">
            Reward Shop 🎁
          </h1>
          <p className="font-quicksand text-lg text-muted-foreground mb-6">
            Exchange your Bubble Points for awesome rewards!
          </p>
          
          {/* Points Balance */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary rounded-full px-8 py-4 shadow-[var(--shadow-card)] border-2 border-primary/20">
            <Sparkles className="w-6 h-6 text-foreground" />
            <div className="text-left">
              <p className="text-xs font-quicksand text-foreground/70">Your Balance</p>
              <p className="font-quicksand font-bold text-2xl text-foreground">450 Points</p>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {rewards.map((reward, index) => (
            <div key={index} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in">
              <RewardCard {...reward} />
            </div>
          ))}
        </div>

        {/* Special Rewards Section */}
        <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-accent/30">
          <div className="text-center mb-6">
            <h2 className="font-quicksand font-bold text-3xl text-foreground mb-2">
              🌟 Limited Edition NFT Badges
            </h2>
            <p className="font-quicksand text-muted-foreground">
              Collect unique digital badges for your achievements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: "🏆", title: "Pioneer Badge", desc: "First 1000 users" },
              { emoji: "🌍", title: "Earth Savior", desc: "100kg cleaned" },
              { emoji: "⚡", title: "Lightning Hero", desc: "Daily streak x30" },
            ].map((nft, index) => (
              <div key={index} className="bg-background/80 rounded-2xl p-6 text-center border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                <div className="text-5xl mb-3">{nft.emoji}</div>
                <h3 className="font-quicksand font-bold text-lg text-foreground mb-1">{nft.title}</h3>
                <p className="font-quicksand text-sm text-muted-foreground">{nft.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
