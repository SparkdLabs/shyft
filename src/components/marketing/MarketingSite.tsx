
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductShowcase } from "./ProductShowcase";
import { FeatureSection } from "./FeatureSection";
import { BenefitsSection } from "./BenefitsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { StatisticsSection } from "./StatisticsSection";

export const MarketingSite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-gray-900">Shyft</span>
              <div className="hidden md:flex items-center gap-6">
                <Link to="#" className="text-gray-600 hover:text-gray-900">About</Link>
                <Link to="#" className="text-gray-600 hover:text-gray-900">Features</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-sm text-gray-600" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button 
                className="rounded-full bg-primary hover:bg-primary/90" 
                size="sm"
                asChild
              >
                <Link to="/login">
                  Take the Quiz <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-gray-900 leading-[1.2] animate-fadeIn">
            Simplify your{" "}
            <span className="inline-block bg-secondary px-2 rounded-lg mb-4">habits</span>
            {" "}and{" "}
            <span className="inline-block bg-accent px-2 rounded-lg">wellbeing.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mt-8 animate-slideUp">
            Build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90 hover:translate-y-[-2px] transition-all duration-300"
              asChild
            >
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full hover:translate-y-[-2px] transition-all duration-300"
              asChild
            >
              <Link to="/login">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Habit Tracking</h3>
              <p className="text-gray-600">
                Build and maintain positive habits with our intuitive tracking system.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Focus Timer</h3>
              <p className="text-gray-600">
                Stay focused and productive with our customizable timer.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Progress Insights</h3>
              <p className="text-gray-600">
                Track your progress with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Feature Details */}
      <FeatureSection />

      {/* Benefits */}
      <BenefitsSection />

      {/* Statistics */}
      <StatisticsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fadeIn">Ready to transform your habits?</h2>
          <p className="text-lg text-muted-foreground mb-8 animate-slideUp">
            Join thousands of users who are already improving their lives with Shyft.
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-primary hover:bg-primary/90 hover:translate-y-[-2px] transition-all duration-300"
            asChild
          >
            <Link to="/login">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Shyft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
