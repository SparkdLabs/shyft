import { Target, Zap, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    title: "Goal Achievement",
    description: "Set and track meaningful goals with our intelligent habit formation system",
    icon: Target,
  },
  {
    title: "Increased Productivity",
    description: "Boost your daily output with our focused work sessions and progress tracking",
    icon: Zap,
  },
  {
    title: "Measurable Growth",
    description: "Watch your progress with detailed analytics and achievement milestones",
    icon: TrendingUp,
  },
  {
    title: "Community Support",
    description: "Join a community of like-minded individuals on their journey to success",
    icon: Users,
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary-50 via-white to-white" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
          Transform Your Life with Shyft
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Experience the power of habit formation and productivity enhancement
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-3 bg-primary-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};