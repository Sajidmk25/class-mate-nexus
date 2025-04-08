
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Student",
    content: "The virtual classroom experience has completely transformed how I approach my studies. The interactive tools and supportive community make learning enjoyable.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Business Administration",
    content: "As a working professional, I needed a flexible learning solution. This platform delivered exactly what I needed with high-quality instruction and convenient scheduling.",
    avatar: "MC"
  },
  {
    name: "Aisha Patel",
    role: "Data Science Major",
    content: "The collaborative features in the virtual classroom helped me connect with peers around the world. We solve problems together despite being thousands of miles apart.",
    avatar: "AP"
  }
];

const TestimonialSection = () => {
  return (
    <section className="bg-soft-green py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-emerald/10 text-emerald font-medium text-sm py-1 px-3 rounded-full mb-2">
            Student Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            What Our Students <span className="text-gradient bg-gradient-to-r from-emerald to-deep-blue">Say</span>
          </h2>
          <p className="text-gray-700">
            Hear from the students who have experienced our virtual classroom firsthand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-none shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-deep-blue/90 flex items-center justify-center text-white font-bold text-lg mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.content}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
