"use client";
import Image from "next/image";
import masteringForceSrc from "../../assets/landing-imgs/masteringForce.png";
import { BadgeCheck, Building, Clock4, Users } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function AboutStats() {
  const { translations, dir } = useLanguage();
  const { about } = translations.home;
  return (
    <section dir={dir} className="w-[80%] md:w-[90%] m-auto border-b border-border bg-background py-12" >
      <div className="flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 text-center">
          <div className="relative">

            <div className="border-[10px] border-spacing-3 border-icon w-[100%] md:w-[80%] rounded-md mb-6">
              <Image
                src={masteringForceSrc}
                alt="mastering force image"
                width={552}
                height={414}
                className="object-contain object-left rounded-md"
              />
            </div>
            <div className="absolute text-start hidden md:block w-[295px] overflow-hidden min-h-[120px] p-6 bg-cardPrimary rounded-md bottom-[-30px] end-[90px]">
              <h2 className="font-bold text-[36px]  text-cardPrimary-foreground">{about.stats.numYears}</h2>
              <p className="font-bold text-[10px] text-cardPrimary-foreground">{about.stats.years}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5 md:gap-8">
          <div className="py-1 px-3 bg-[#EEF2FF] inline-block w-fit bg-note">
            <span className="font-inter text-xs font-semibold uppercase tracking-wider  text-note-foreground sm:text-sm">{about.sectionLabel}</span>
          </div>
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-normal text-[color:var(--service-title)] sm:text-4xl lg:text-5xl">{about.title.replace('precision', '')}

            <span className="mb-2 font-semibold tracking-wider text-[color:var(--service-label)]">{about.title.toLowerCase().includes("precision") ? ' precision .' : ''}</span></h2>
          <p className="line-clamp-4 max-w-lg font-inter text-sm font-light leading-relaxed tracking-normal text-[color:var(--service-description)] sm:text-base">
            {about.description} </p>

          <div className="flex flex-row flex-wrap">
            <div className="w-1/2 flex items-center gap-3 mb-6 truncate">
              <div className="bg-icon text-icon-foreground flex items-center justify-center rounded-md  min-w-[48px] h-[48px]">
                <Building />
              </div>
              <div className="min-w-0">
                <h4 className="text-[color:var(--service-title)] font-bold text-[30px] truncate">
                  {about.stats.numProjects}
                </h4>
                <p className="font-bold text-[10px] truncate">
                  {about.stats.globalProjects}
                </p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3  mb-6 truncate">
              <div className="bg-icon text-icon-foreground flex items-center justify-center rounded-md  min-w-[48px] h-[48px]">
                <Clock4 />
              </div>
              <div className="min-w-0">
                <h4 className="text-[color:var(--service-title)] font-bold text-[30px] truncate">{about.stats.numHours}</h4>
                <p className=" font-bold text-[10px]">{about.stats.workHours}</p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3  mb-6 truncate min-w-0">
              <div className="bg-icon text-icon-foreground flex items-center justify-center rounded-md min-w-[48px] h-[48px]">
                <Users />
              </div>
              <div className="min-w-0">
                <h4 className="text-[color:var(--service-title)] font-bold text-[30px] truncate">{about.stats.numMembers}</h4>
                <p className=" font-bold text-[10px]">{about.stats.staffMembers}</p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3  mb-6 truncate">
              <div className="bg-icon text-icon-foreground flex items-center justify-center rounded-md  min-w-[48px] h-[48px]">
                <BadgeCheck />
              </div>
              <div className="min-w-0">
                <h4 className="text-[color:var(--service-title)] font-bold text-[30px] truncate">{about.stats.certificate}</h4>
                <p className=" font-bold text-[10px]">{about.stats.certifiedQuality}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
