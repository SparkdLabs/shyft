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
    <section className="py-24 px-4 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
          Why Choose Shyft?
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          See how Shyft stands out from traditional habit tracking apps
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Shyft Column */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-8 text-primary">Shyft</h3>
            <ul className="space-y-6">
              {comparisonData.shyft.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="p-1 bg-primary-50 rounded-full">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Others Column */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-semibold mb-8 text-gray-400">Others</h3>
            <ul className="space-y-6">
              {comparisonData.others.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-400">
                  <div className="p-1 bg-gray-200 rounded-full">
                    <X className="h-4 w-4" />
                  </div>
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
