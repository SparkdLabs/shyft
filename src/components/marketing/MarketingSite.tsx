import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Clock, BarChart, Target, CheckCircle, ArrowRight } from "lucide-react";

export const MarketingSite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Shyft
              </span>
            </div>
            <div>
              <Button asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 animate-fadeIn">
            Transform Your Habits,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform Your Life
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slideUp">
            Shyft helps you build lasting habits, boost productivity, and achieve your goals with a personalized approach to self-improvement.
          </p>
          <Button size="lg" asChild className="animate-slideUp">
            <Link to="/login">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Product Screenshot Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Track Your Progress with Beautiful Analytics</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get detailed insights into your habit formation and productivity patterns with our intuitive dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  "Visual progress tracking",
                  "Daily, weekly, and monthly views",
                  "Custom goal setting",
                  "Achievement system"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img
                src="/dashboard-screenshot.png"
                alt="Shyft Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features to Drive Success</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Timer Screenshot */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg shadow-xl overflow-hidden order-2 md:order-1">
              <img
                src="/focus-timer-screenshot.png"
                alt="Focus Timer"
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Stay Focused and Productive</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our customizable focus timer helps you maintain concentration and track your productive hours throughout the day.
              </p>
              <ul className="space-y-4">
                {[
                  "Customizable timer durations",
                  "Break reminders",
                  "Session statistics",
                  "Daily focus goals"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-muted rounded-xl"
              >
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who are already transforming their habits with Shyft.
          </p>
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
            <p className="text-4xl font-bold mb-4">$0</p>
            <p className="text-muted-foreground mb-6">No credit card required</p>
            <Button size="lg" className="w-full" asChild>
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

const features = [
  {
    title: "Habit Tracking",
    description: "Build and maintain positive habits with our intuitive tracking system.",
    icon: Award,
  },
  {
    title: "Focus Timer",
    description: "Boost productivity with our customizable Pomodoro-style focus timer.",
    icon: Clock,
  },
  {
    title: "Progress Insights",
    description: "Track your progress with detailed analytics and personalized insights.",
    icon: BarChart,
  },
];

const testimonials = [
  {
    quote: "Shyft has completely transformed how I approach my daily tasks and goals. The habit tracking feature is a game-changer.",
    author: "Sarah Chen",
    role: "Product Manager"
  },
  {
    quote: "The focus timer has helped me maintain deep work sessions and significantly improved my productivity.",
    author: "Michael Rodriguez",
    role: "Software Engineer"
  },
  {
    quote: "I love how the app helps me build better habits while tracking my progress. It's become an essential part of my daily routine.",
    author: "Emily Thompson",
    role: "Marketing Director"
  }
];