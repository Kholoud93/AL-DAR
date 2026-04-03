"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import constructionManagementImage from "@/assets/landing-imgs/Construction-Management.png";
import structuralEngineeringImage from "@/assets/landing-imgs/Structural-Engineering.png";
import urbanPlanningImage from "@/assets/landing-imgs/Urban-Planning.png";

const SERVICE_KEYS = [
  "constructionManagement",
  "structuralEngineering",
  "urbanPlanningAndDesign",
] as const;

const IMAGES = [
  constructionManagementImage,
  structuralEngineeringImage,
  urbanPlanningImage,
];

type ServicesCarouselProps = {
  className?: string;
};

export default function ServicesCarousel({ className }: ServicesCarouselProps) {
  const { translations, dir, isRTL } = useLanguage();
  const { services } = translations.home;

  return (
    <section
      dir={dir}
      className={cn(
        "overflow-x-clip bg-aldar-light py-16 transition-colors sm:py-20",
        "dark:bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-screen-xl min-w-0 px-6">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-wider text-[color:var(--service-label)] sm:text-sm">
              {services.sectionLabel}
            </p>
            <h2 className="font-sans text-3xl font-bold leading-tight tracking-normal text-[color:var(--service-title)] sm:text-4xl lg:text-5xl">
              {services.title}
            </h2>
          </div>
          <p
            className={cn(
              "max-w-md font-inter text-sm font-light leading-relaxed tracking-normal text-[color:var(--service-description)] sm:text-base",
              isRTL ? "lg:text-start" : "lg:text-end",
            )}
          >
            {services.description}
          </p>
        </div>

        <div className="relative max-w-full min-w-0 px-10 sm:px-12 md:px-14">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
            }}
            className="w-full max-w-full min-w-0"
          >
            <CarouselContent className="-ms-3 sm:-ms-4">
              {SERVICE_KEYS.map((key, index) => {
                const title = services.items[key];
                const tag = services.itemTags[key];
                return (
                  <CarouselItem
                    key={key}
                    className="min-h-0 basis-full ps-3 sm:basis-1/2 sm:ps-4 lg:basis-1/3"
                  >
                    <div
                      className={cn(
                        "group relative w-full cursor-pointer overflow-hidden rounded-none border-y border-border/60 shadow-lg",
                        "aspect-[4/5] sm:aspect-[3/4] lg:aspect-[2/3]",
                      )}
                    >
                      <div className="relative h-full min-h-0 w-full overflow-hidden">
                        <Image
                          src={IMAGES[index]}
                          alt={title}
                          fill
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 260px, 280px"
                          className="bg-aldar-dark object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                      <div
                        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-service-overlay)] transition-opacity duration-300 group-hover:opacity-0"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-service-overlay-hover)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-start sm:p-6 md:p-7">
                        <p className="font-inter text-xs font-medium uppercase leading-5 tracking-[0.12em] text-[color:var(--service-card-tag)]">
                          {tag}
                        </p>
                        <h3 className="mt-2 font-sans text-2xl font-bold leading-tight text-[color:var(--service-card-title)] sm:text-3xl">
                          {title}
                        </h3>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="start-1 border-border bg-card text-card-foreground shadow-md hover:bg-muted sm:start-2" />
            <CarouselNext className="end-1 border-border bg-card text-card-foreground shadow-md hover:bg-muted sm:end-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
