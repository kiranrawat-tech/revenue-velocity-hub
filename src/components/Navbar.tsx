import { Calculator, TrendingUp, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <span className="glow-text">NurtureROI</span>
          </Link>

          {!isLanding && (
            <div className="flex items-center gap-6">
              <Link
                to="/calculator"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Calculator
              </Link>
              <Link
                to="/results"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Results
              </Link>
              <Link
                to="/benchmarks"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                Benchmarks
              </Link>
              <Link
                to="/integrations"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                Integrations
              </Link>
              <ThemeToggle />
            </div>
          )}

          {isLanding && (
            <ThemeToggle />
          )}
        </div>
      </div>
    </nav>
  );
}
