import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Users, Target, Award } from 'lucide-react';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About JobPortal</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connecting talent with opportunities since 2020. We're dedicated to making job searching and hiring seamless for everyone.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To bridge the gap between talented professionals and companies seeking exceptional candidates through innovative technology.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Community</h3>
            <p className="text-muted-foreground">
              We've built a thriving community of 50,000+ candidates and 5,000+ companies who trust us for their hiring needs.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Values</h3>
            <p className="text-muted-foreground">
              Transparency, efficiency, and inclusivity drive everything we do. We believe everyone deserves a fair shot at their dream career.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How JobPortal Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple. Follow these easy steps to find your dream job or hire top talent.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">1</div>
              <h3 className="text-lg font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">Sign up as a candidate or employer and complete your profile with relevant details and requirements.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">2</div>
              <h3 className="text-lg font-semibold mb-2">Search & Connect</h3>
              <p className="text-muted-foreground">Browse opportunities or post jobs. Use our powerful search filters to find the perfect match for your needs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">3</div>
              <h3 className="text-lg font-semibold mb-2">Get Hired or Hire</h3>
              <p className="text-muted-foreground">Apply with one click or review applications. Track everything conveniently in your personalized dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, JobPortal emerged from a simple observation: the job market needed a platform that truly understood both candidates and employers. Traditional job boards were either too complex or lacked the features needed for modern hiring.
            </p>
            <p>
              We set out to create a solution that combines powerful search capabilities with an intuitive user experience. Today, JobPortal serves thousands of users worldwide, facilitating meaningful connections between talent and opportunity every day.
            </p>
            <p>
              Our platform continues to evolve based on user feedback, ensuring we're always meeting the changing needs of the modern job market. Whether you're looking for your next career move or seeking top talent for your organization, JobPortal is here to help.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <p className="text-center text-muted-foreground mb-12">
              Have questions or need assistance? We're here to help. Reach out to our support team and we'll get back to you as soon as possible.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href="mailto:support@jobportal.com" className="text-primary hover:underline">
                  support@jobportal.com
                </a>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground">
                  123 Business St<br />San Francisco, CA 94102
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">Ready to get started?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register?role=candidate">
                  <Button size="lg">Join as Candidate</Button>
                </Link>
                <Link to="/register?role=employer">
                  <Button size="lg" variant="secondary">Join as Employer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
