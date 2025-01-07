import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 animate-fadeIn leading-tight">
          Transform Your Habits,{" "}
          <span className="text-primary">
            Transform Your Life
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto animate-slideUp">
          Shyft helps you build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-slideUp">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" 
            asChild
          >
            <Link to="/login">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto" 
            asChild
          >
            <Link to="/login">View Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};