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
    <section className="py-16 px-4 bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Transform Your Life with Shyft</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Experience the power of habit formation and productivity enhancement
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <benefit.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};