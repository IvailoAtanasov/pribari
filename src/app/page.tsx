import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <Footer />
    </main>
  );
}
