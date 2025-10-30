 import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">JobPortal</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting talent with opportunities. Your next career move starts here.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/register?role=candidate" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/register?role=candidate" className="hover:text-primary transition-colors">Career Resources</Link></li>
              <li><a href="#about" className="hover:text-primary transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/register?role=employer" className="hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link to="/register?role=employer" className="hover:text-primary transition-colors">Find Talent</Link></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
