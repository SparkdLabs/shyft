import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
          Transform Your Habits,{" "}
          <span className="text-primary">
            Transform Your Life
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slideUp">
          Shyft helps you build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
        </p>
        <div className="flex gap-4 justify-center animate-slideUp">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/login">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">View Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};