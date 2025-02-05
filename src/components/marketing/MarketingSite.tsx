import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const MarketingSite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold">Shyft</span>
              <div className="hidden md:flex items-center gap-6">
                <Link to="#" className="nav-link">About</Link>
                <Link to="#" className="nav-link">Features</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-sm" asChild>
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
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl">
            Simplify your{" "}
            <span className="inline-block bg-secondary px-2 rounded-lg">habits</span>
            {" "}and{" "}
            <span className="inline-block bg-accent px-2 rounded-lg">wellbeing.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full bg-primary hover:bg-primary/90"
              asChild
            >
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full"
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
            <div className="bg-background p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Habit Tracking</h3>
              <p className="text-muted-foreground">
                Build and maintain positive habits with our intuitive tracking system.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Focus Timer</h3>
              <p className="text-muted-foreground">
                Stay focused and productive with our customizable timer.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Progress Insights</h3>
              <p className="text-muted-foreground">
                Track your progress with detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your habits?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who are already improving their lives with Shyft.
          </p>
          <Button 
            size="lg" 
            className="rounded-full bg-primary hover:bg-primary/90"
            asChild
          >
            <Link to="/login">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
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