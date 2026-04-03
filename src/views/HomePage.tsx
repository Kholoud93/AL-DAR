import AboutStats from "@/components/sections/AboutStats";
import CallToAction from "@/components/sections/CallToAction";
import Certificates from "@/components/sections/Certificates";
import ClientsPartners from "@/components/sections/ClientsPartners";
import HeroSlider from "@/components/sections/HeroSlider";
import ServicesCarousel from "@/components/sections/ServicesCarousel";

export default function HomePage() {
  return (
    <main className="flex w-full min-h-[calc(100vh-4.25rem)] flex-col bg-background">
      <HeroSlider />
      <AboutStats />
      <ServicesCarousel />
      <Certificates />
      <ClientsPartners />
      <CallToAction />
    </main>
  );
}
