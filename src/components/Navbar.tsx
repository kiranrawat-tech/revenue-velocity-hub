import { NavLink } from "@/components/NavLink";
import { Calculator, BarChart3, Target, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const linkClass = "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground";
  const activeClass = "!text-primary bg-primary/10 shadow-[0_0_12px_hsl(42_87%_58%/0.15)]";

  return (
    <header className="glass-card sticky top-0 z-50 border-b border-t-0 border-x-0 rounded-none">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">NurtureROI</span>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1">
            <NavLink to="/" end className={linkClass} activeClassName={activeClass}>
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calculator</span>
            </NavLink>
            <NavLink to="/results" className={linkClass} activeClassName={activeClass}>
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Results</span>
            </NavLink>
            <NavLink to="/benchmarks" className={linkClass} activeClassName={activeClass}>
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Benchmarks</span>
            </NavLink>
            <NavLink to="/integrations" className={linkClass} activeClassName={activeClass}>
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Integrations</span>
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
