import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fadeIn">
            Master Your Day, <br />
            Master Your Career
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 animate-slideUp">
            Shyft helps ambitious professionals build powerful habits, stay focused,
            and achieve their career goals.
          </p>
          <Button 
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 animate-slideUp"
          >
            Start Your Journey
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Everything You Need to Excel
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              title="Smart Habit Building"
              description="Create and track habits that align with your career goals, backed by proven productivity techniques."
              className="animate-fadeIn delay-100"
            />
            <FeatureCard
              title="Focus Timer"
              description="Stay in the zone with our customizable focus timer, designed to maximize your productivity."
              className="animate-fadeIn delay-200"
            />
            <FeatureCard
              title="Progress Tracking"
              description="Monitor your growth with intuitive progress tracking and achievement milestones."
              className="animate-fadeIn delay-300"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Join Thousands of Growing Professionals
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              quote="Shyft helped me develop the habits I needed to get promoted within 6 months."
              author="Sarah K."
              role="Product Manager"
              className="animate-fadeIn delay-100"
            />
            <TestimonialCard
              quote="The focus timer feature has doubled my productivity. Game changer!"
              author="Michael R."
              role="Software Engineer"
              className="animate-fadeIn delay-200"
            />
            <TestimonialCard
              quote="Finally, an app that understands career development is about daily habits."
              author="Lisa M."
              role="Marketing Director"
              className="animate-fadeIn delay-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-600">
              Join Shyft today and start building the habits that will define your success.
            </p>
            <Button 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  className 
}: { 
  title: string; 
  description: string; 
  className?: string;
}) => (
  <div className={`p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 ${className}`}>
    <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  className 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  className?: string;
}) => (
  <div className={`p-6 bg-white rounded-lg shadow-sm ${className}`}>
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <div>
      <p className="font-semibold text-primary">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);