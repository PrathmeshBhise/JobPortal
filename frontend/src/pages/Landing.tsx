import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Briefcase, Search, Users, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import Footer from '@/components/Footer';

const Landing = () => {
    const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === 'ROLE_CANDIDATE') {
      navigate('/candidate/dashboard', { replace: true });
    } else if (user.role === 'ROLE_EMPLOYER') {
      navigate('/employer/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Show landing page only if user is not logged in
  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-medium">Find Your Dream Job Today</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Connect with
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Opportunities </span>
            That Match Your Skills
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals finding their perfect role, or post jobs to discover top talent for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register?role=candidate">
              <Button size="lg" className="text-lg px-8">Join as Candidate</Button>
            </Link>
            <Link to="/register?role=employer">
              <Button size="lg" variant="secondary" className="text-lg px-8">Join as Employer</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Job Search</h3>
            <p className="text-muted-foreground">
              Find relevant opportunities with our powerful search and filtering system.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Top Talent</h3>
            <p className="text-muted-foreground">
              Connect with qualified candidates ready to join your team.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-muted-foreground">
              Track applications and manage your career journey in one place.
            </p>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Candidates</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;

