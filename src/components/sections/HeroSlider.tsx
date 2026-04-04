"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay"; // 1. استيراد الإضافة
import Container from "@/assets/landing-imgs/heroSectionImage.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

const SLIDES = [
  {
    title: "Sustainable Rural \n Sanitation Services.",
    description: "Pioneering ecological infrastructure development across regional Egypt.",
    image: Container.src,
  },
  {
    title: "Innovative Engineering \n for the Future.",
    description: "Bringing clean water and sanitation to over 5 million citizens.",
    image: Container.src,
  },
];

export default function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
    const { translations, dir } = useLanguage();
    const heroText = translations.home.hero;

  return (
    <section  dir={dir} className="relative w-full  min-h-[calc(100vh-80px)]">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        className="w-full h-full"
        opts={{
    loop: true,
    direction: dir, 
  }}
      >
        <CarouselContent className="ml-0 min-h-[calc(100vh-80px)]">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 relative overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-primary/30 flex items-center">
                  <div className="container px-10">

                    <div className={cn(
                      "max-w-[700px] flex flex-col gap-6 text-white transition-all duration-700",
                      current === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    )}>
                      <h2 className="font-bold text-[40px] md:text-[72px] leading-tight whitespace-pre-line">
                        {heroText.items[index].title}
                      </h2>
                      <p className="text-xl font-medium opacity-90 max-w-[550px]">
                     {heroText.items[index].subtitle}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <Button variant="secondary" className="h-12 md:h-14 px-8 text-base font-bold rounded-none">
                          {heroText.primaryCta}
                        </Button>
                        <Button variant="outline" className="h-12 md:h-14  px-8 text-base font-bold rounded-none border-white text-white hover:bg-white hover:text-primary">
                          {heroText.secondaryCta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>


        <div className="absolute bottom-3 md:bottom-8 left-10 z-30 w-[90%] flex justify-center md:justify-end gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i, true)}
              className={cn(
                "h-2 transition-all duration-300 rounded-full",
                current === i ? "w-10 bg-white " : "w-3 bg-white/40 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </Carousel>
    </section>
  );
}