import { Award, Clock, BarChart } from "lucide-react";

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

export const FeatureSection = () => {
  return (
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
  );
};