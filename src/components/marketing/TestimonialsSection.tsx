
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Since using Shyft, I've been able to consistently maintain my morning routine. The app's intuitive design and helpful reminders keep me on track.",
    author: "Sarah Chen",
    role: "Marketing Director"
  },
  {
    quote: "The habit stacking feature has revolutionized how I approach my daily tasks. I've seen remarkable improvements in my productivity.",
    author: "Michael Rodriguez",
    role: "Software Engineer"
  },
  {
    quote: "I love how Shyft helps me break down my goals into manageable daily habits. It's made a huge difference in my personal development.",
    author: "Emily Thompson",
    role: "Fitness Coach"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-muted rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
              <p className="text-lg mb-6 text-gray-700">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
