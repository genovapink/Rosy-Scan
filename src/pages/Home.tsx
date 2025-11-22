import { Scan, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import BadgeCard from "@/components/BadgeCard";
import rosyHero from "@/assets/rosy-hero.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-quicksand font-bold text-4xl md:text-6xl text-foreground leading-tight">
              Help Rosy Keep The World Clean! 🌍
            </h1>
            <p className="font-quicksand text-lg md:text-xl text-muted-foreground">
              Temukan sampah di dunia nyata, scan, dapatkan poin, dan bantu Rosy membuat bumi lebih bersih.
            </p>
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 text-foreground font-quicksand font-bold text-lg px-8 py-6 shadow-[var(--shadow-card)] transition-all"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Cleaning
            </Button>
          </div>

          <div className="relative animate-float">
            <img 
              src={rosyHero} 
              alt="Rosy Character" 
              className="w-full h-auto rounded-3xl shadow-[var(--shadow-float)]"
            />
          </div>
        </div>
      </section>

      {/* Badge Row */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <BadgeCard
            icon={Scan}
            title="Scan Trash"
            description="Temukan dan scan sampah menggunakan kamera"
          />
          <BadgeCard
            icon={Sparkles}
            title="Earn Bubble Points"
            description="Kumpulkan poin dari setiap misi yang diselesaikan"
          />
          <BadgeCard
            icon={Gift}
            title="Get Rewards"
            description="Tukar poin dengan hadiah eksklusif"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20">
          <h2 className="font-quicksand font-bold text-3xl text-center text-foreground mb-8">
            Rosy Community Impact 🌱
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10,234", label: "Trash Collected" },
              { value: "5,678", label: "Active Heroes" },
              { value: "23", label: "Cities" },
              { value: "145kg", label: "Waste Recycled" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 bg-muted rounded-2xl">
                <p className="font-quicksand font-bold text-3xl text-foreground mb-1">{stat.value}</p>
                <p className="font-quicksand text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
