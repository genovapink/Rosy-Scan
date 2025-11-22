import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import rosyLogo from "@/assets/rosy-logo.png";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/missions", label: "Missions" },
    { path: "/map", label: "Map" },
    { path: "/rewards", label: "Rewards" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 p-1 transition-transform group-hover:scale-110">
            <img src={rosyLogo} alt="Rosy" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-quicksand font-bold text-2xl text-foreground italic flex items-center gap-1">
            ROSY
            <Sparkles className="w-4 h-4 text-accent" />
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full font-quicksand font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-full transition-all ${
                location.pathname === item.path
                  ? "bg-primary text-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="text-xs font-quicksand font-medium">{item.label[0]}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
