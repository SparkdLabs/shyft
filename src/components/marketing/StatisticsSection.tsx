import { Users, Star, Award } from "lucide-react";

const stats = [
  {
    number: "50,000+",
    label: "Active Users",
    icon: Users,
  },
  {
    number: "4.8/5",
    label: "User Rating",
    icon: Star,
  },
  {
    number: "1M+",
    label: "Habits Tracked",
    icon: Award,
  },
];

export const StatisticsSection = () => {
  return (
    <section className="py-16 px-4 bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 border border-white/10 rounded-xl"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 opacity-80" />
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};