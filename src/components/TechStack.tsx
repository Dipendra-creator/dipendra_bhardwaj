"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="flex flex-col space-y-6">
        {/* Languages */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Languages</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=rust,java,python,dotnet,cs,typescript,javascript,go" />
          </div>
        </div>

        {/* Backend & Frameworks */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Backend & Frameworks</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=spring,dotnet,django,flask,fastapi,nodejs,express" />
          </div>
        </div>

        {/* Frontend */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=react,nextjs,angular,vue,tailwind,html,css,sass" />
          </div>
        </div>

        {/* Databases */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Databases</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=mysql,postgres,mongodb,redis,sqlite" />
          </div>
        </div>

        {/* DevOps & Cloud */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">DevOps & Cloud</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=docker,kubernetes,aws,azure,gcp,jenkins,github,gitlab" />
          </div>
        </div>

        {/* Tools & Others */}
        <div>
          <h3 className="text-sm font-semibold text-secondary mb-3">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            <img className="tech-icons" src="https://skillicons.dev/icons?i=kafka,linux,git,vscode,postman,nginx,grafana" />
          </div>
        </div>
      </div>
    </div>
  );
};
