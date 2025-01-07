import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { ProductShowcase } from "./ProductShowcase";
import { TestimonialsSection } from "./TestimonialsSection";
import { ComparisonSection } from "./ComparisonSection";
import { BenefitsSection } from "./BenefitsSection";

export const MarketingSite = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Shyft</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <BenefitsSection />
      <ProductShowcase />
      <ComparisonSection />
      <FeatureSection />
      <TestimonialsSection />

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who are already transforming their habits with Shyft.
          </p>
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
            <p className="text-4xl font-bold mb-4 text-primary">$0</p>
            <p className="text-muted-foreground mb-6">No credit card required</p>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90" asChild>
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Shyft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};