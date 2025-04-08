
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";
import TestimonialSection from "@/components/TestimonialSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-light-blue">
      <Header />
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
