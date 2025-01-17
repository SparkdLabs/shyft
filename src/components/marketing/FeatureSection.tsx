import { CheckCircle, Calendar, BarChart } from "lucide-react";

const features = [
  {
    title: "Smart Habit Tracking",
    description: "Build and maintain positive habits with our AI-powered tracking system.",
    icon: CheckCircle,
  },
  {
    title: "Focus Timer",
    description: "Boost productivity with our customizable Pomodoro-style focus timer.",
    icon: Calendar,
  },
  {
    title: "Progress Insights",
    description: "Track your progress with detailed analytics and personalized insights.",
    icon: BarChart,
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
          Powerful Features to Drive Success
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Everything you need to transform your habits and achieve your goals
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideUp group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-4 bg-primary-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};