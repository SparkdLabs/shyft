import { CheckCircle } from "lucide-react";

export const ProductShowcase = () => {
  return (
    <>
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
                src="/lovable-uploads/9c924094-b251-401a-9444-e2717bff36eb.png"
                alt="Habit Tracking Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-lg shadow-xl overflow-hidden">
              <img
                src="/lovable-uploads/561ae916-220a-439e-a5e5-d8475dcfe50e.png"
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
    </>
  );
};