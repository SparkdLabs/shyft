import { Check, X } from "lucide-react";

const comparisonData = {
  shyft: [
    "Personalized habit recommendations",
    "Focus timer with productivity insights",
    "Achievement system for motivation",
    "Calendar integration",
    "Progress tracking with detailed analytics",
    "Mobile-friendly interface"
  ],
  others: [
    "Generic habit templates",
    "Basic timer functionality",
    "Limited progress tracking",
    "No calendar integration",
    "Basic statistics only",
    "Desktop-focused experience"
  ]
};

export const ComparisonSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Shyft?</h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          See how Shyft stands out from traditional habit tracking apps
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Shyft Column */}
          <div className="bg-primary/5 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-primary">Shyft</h3>
            <ul className="space-y-4">
              {comparisonData.shyft.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Others Column */}
          <div className="bg-muted rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Others</h3>
            <ul className="space-y-4">
              {comparisonData.others.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <X className="h-5 w-5 text-muted-foreground/70 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
