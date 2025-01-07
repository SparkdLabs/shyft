const testimonials = [
  {
    quote: "Shyft has completely transformed how I approach my daily tasks and goals. The habit tracking feature is a game-changer.",
    author: "Sarah Chen",
    role: "Product Manager"
  },
  {
    quote: "The focus timer has helped me maintain deep work sessions and significantly improved my productivity.",
    author: "Michael Rodriguez",
    role: "Software Engineer"
  },
  {
    quote: "I love how the app helps me build better habits while tracking my progress. It's become an essential part of my daily routine.",
    author: "Emily Thompson",
    role: "Marketing Director"
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
              className="p-6 bg-muted rounded-xl"
            >
              <p className="text-lg mb-4">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};