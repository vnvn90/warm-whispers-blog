import { Link, useLocation } from "react-router-dom";
import { PenTool, Home, User, Info } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/create", label: "Write", icon: PenTool },
    { path: "/author", label: "My Posts", icon: User },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="min-h-screen warm-gradient">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 accent-gradient rounded-full flex items-center justify-center">
                <PenTool className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-2xl font-serif font-bold text-foreground">
                QuickBlog
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-[var(--transition-smooth)] ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Link
                to="/create"
                className="btn-accent flex items-center space-x-2"
              >
                <PenTool className="h-4 w-4" />
                <span>Write</span>
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          <nav className="md:hidden mt-4 flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-[var(--transition-smooth)] ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              Made with ❤️ by QuickBlog - Share your stories with the world
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;