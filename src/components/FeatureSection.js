
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Interactive Classrooms",
    description: "Engage in real-time with teachers and peers through our interactive virtual classroom environment.",
    icon: "📚"
  },
  {
    title: "Personalized Learning",
    description: "Adaptive learning paths tailored to your unique needs and learning style.",
    icon: "🎯"
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals and experienced educators passionate about teaching.",
    icon: "👨‍🏫"
  },
  {
    title: "Flexible Schedule",
    description: "Study at your own pace with on-demand access to course materials and recorded sessions.",
    icon: "⏰"
  }
];

const FeatureSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block bg-deep-blue/10 text-deep-blue font-medium text-sm py-1 px-3 rounded-full mb-2">
          Why Choose Us
        </span>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
          Features that <span className="text-gradient bg-gradient-to-r from-deep-blue to-accent">Transform</span> Learning
        </h2>
        <p className="text-gray-700">
          Discover the tools and resources designed to make your educational journey exceptional.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border border-deep-blue/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
