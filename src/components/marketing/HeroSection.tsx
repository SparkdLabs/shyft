import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 px-4 pb-16 bg-gradient-to-b from-white to-primary/5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto text-center w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 animate-fadeIn leading-tight">
          Transform Your Habits,{" "}
          <span className="text-primary">
            Transform Your Life
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto animate-slideUp px-4">
          Shyft helps you build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-base sm:text-lg whitespace-nowrap" 
            asChild
          >
            <Link to="/login">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base sm:text-lg whitespace-nowrap" 
            asChild
          >
            <Link to="/login">View Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};