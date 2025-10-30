import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Briefcase, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">JobPortal</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.name} <span className="text-primary font-medium">({user.role.replace('ROLE_','')})</span>
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <nav className="hidden md:flex items-center gap-6">
                  <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </nav>
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
