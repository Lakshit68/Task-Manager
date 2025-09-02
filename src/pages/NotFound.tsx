import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-strong">
            <AlertTriangle className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-muted-foreground mb-2">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Button asChild className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-medium">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Return to TaskFlow
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
