
import { Link, useLocation } from "react-router-dom";
import { Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Simulador", href: "/simulator" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-solar p-2 rounded-xl">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">QEnergia</h1>
              <p className="text-xs text-muted-foreground -mt-1">Simulator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.href)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-gradient-solar hover:opacity-90 transition-opacity">
              <Link to="/simulator">Simular Agora</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col space-y-6 mt-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="bg-gradient-solar hover:opacity-90 transition-opacity w-full">
                  <Link to="/simulator">Simular Agora</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
