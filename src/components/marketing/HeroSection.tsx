import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 px-4 pb-16 bg-gradient-radial from-primary-100 via-white to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] rounded-full bg-gradient-radial from-primary-200/30 via-transparent to-transparent animate-float" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[100%] h-[100%] rounded-full bg-gradient-radial from-primary-100/30 via-transparent to-transparent animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto text-center w-full relative z-10">
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full mb-8 animate-fadeIn">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Transform your habits with AI-powered insights</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 animate-fadeIn leading-tight bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
          Transform Your Habits,{" "}
          <span className="block">
            Transform Your Life
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto animate-slideUp px-4">
          Shyft helps you build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-600 text-base sm:text-lg whitespace-nowrap group transition-all duration-300" 
            asChild
          >
            <Link to="/login">
              Get Started Free 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base sm:text-lg whitespace-nowrap border-2 hover:bg-primary-50 transition-all duration-300" 
            asChild
          >
            <Link to="/login">View Demo</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-muted-foreground mb-4">Trusted by professionals worldwide</p>
          <div className="flex justify-center gap-8 opacity-60">
            {/* Add your trust indicator logos here */}
            <div className="w-24 h-8 bg-gray-400/20 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-400/20 rounded animate-pulse"></div>
            <div className="w-24 h-8 bg-gray-400/20 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};