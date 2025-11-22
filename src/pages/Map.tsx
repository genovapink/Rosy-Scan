import { useState } from "react";
import { MapPin, Camera, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TrashLocation {
  id: number;
  lat: number;
  lng: number;
  type: string;
  points: number;
}

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState<TrashLocation | null>(null);
  
  const trashLocations: TrashLocation[] = [
    { id: 1, lat: 35, lng: 25, type: "Plastic Bottle", points: 5 },
    { id: 2, lat: 45, lng: 45, type: "Paper Waste", points: 3 },
    { id: 3, lat: 60, lng: 30, type: "Metal Can", points: 8 },
    { id: 4, lat: 30, lng: 60, type: "Food Wrapper", points: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-quicksand font-bold text-4xl md:text-5xl text-foreground mb-4">
            Trash Map 🗺️
          </h1>
          <p className="font-quicksand text-lg text-muted-foreground">
            Find trash near you and claim missions!
          </p>
        </div>

        {/* Cute Map Illustration */}
        <div className="relative bg-gradient-to-br from-secondary/30 to-primary/30 rounded-3xl p-8 shadow-[var(--shadow-card)] border-2 border-primary/20 min-h-[500px]">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-foreground/20"></div>
              ))}
            </div>
          </div>

          {/* Trash Location Markers */}
          {trashLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="absolute w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-full shadow-[var(--shadow-card)] border-2 border-background flex items-center justify-center hover:scale-125 transition-all animate-bounce cursor-pointer"
              style={{
                top: `${location.lat}%`,
                left: `${location.lng}%`,
                animationDelay: `${location.id * 0.2}s`,
              }}
            >
              <MapPin className="w-6 h-6 text-foreground" />
            </button>
          ))}

          {/* Cute Decorations */}
          <div className="absolute bottom-4 left-4 text-4xl animate-float">🌳</div>
          <div className="absolute top-4 right-4 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>☁️</div>
          <div className="absolute bottom-4 right-8 text-3xl animate-float" style={{ animationDelay: "1s" }}>🌸</div>
        </div>

        {/* Location Detail Modal */}
        <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
          <DialogContent className="rounded-3xl border-2 border-primary/20">
            <DialogHeader>
              <DialogTitle className="font-quicksand font-bold text-2xl text-foreground flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Trash Found!
              </DialogTitle>
            </DialogHeader>
            
            {selectedLocation && (
              <div className="space-y-4">
                <div className="bg-muted rounded-2xl p-4 text-center">
                  <p className="text-6xl mb-2">🗑️</p>
                  <p className="font-quicksand font-bold text-lg text-foreground">{selectedLocation.type}</p>
                </div>

                <div className="bg-primary/20 rounded-2xl p-4">
                  <p className="font-quicksand text-foreground text-center mb-2">
                    Ambil sampah ini untuk bantu Rosy!
                  </p>
                  <div className="flex justify-center">
                    <span className="px-4 py-2 bg-accent rounded-full font-quicksand font-bold text-foreground">
                      +{selectedLocation.points} Points
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-foreground font-quicksand font-semibold">
                    <Camera className="w-4 h-4 mr-2" />
                    Scan Trash
                  </Button>
                  <Button className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-foreground font-quicksand font-semibold">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Claim Mission
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm font-quicksand text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  Location Verified
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Map;
