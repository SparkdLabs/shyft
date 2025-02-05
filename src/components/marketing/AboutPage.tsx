
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-gray-900">Shyft</Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/about" className="text-gray-900 font-medium">About</Link>
                <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
                <Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
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
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Shyft</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're on a mission to help people build better habits and achieve their goals through science-backed methods and intuitive design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Shyft, we believe that lasting change comes from small, consistent actions. We've built a platform that makes it easy to build and maintain positive habits, helping you achieve your goals one step at a time.
            </p>
            <p className="text-lg text-gray-600">
              Our approach combines behavioral science with intuitive design to create a habit-building experience that actually works.
            </p>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <img 
              src="/lovable-uploads/9c924094-b251-401a-9444-e2717bff36eb.png" 
              alt="Mission visualization" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplicity",
                description: "We believe in making habit building as simple and intuitive as possible."
              },
              {
                title: "Science-Backed",
                description: "Our methods are based on proven behavioral science and psychology research."
              },
              {
                title: "User-Focused",
                description: "Everything we build is designed with our users' success in mind."
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 bg-muted rounded-2xl mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Habits?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
      </div>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Shyft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
