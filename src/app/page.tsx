"use client";
import { Container } from "@/components/Container";

import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  let join_date = new Date("2022-07-01");

  let total_experience = new Date(new Date().getTime() - join_date.getTime());
  let years = total_experience.getUTCFullYear() - 1970;
  let months = total_experience.getUTCMonth();
  let days = total_experience.getUTCDate();

  useGSAP(() => {
    // Animate wave emoji
    gsap.from(".wave-emoji", {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Animate heading
    gsap.from(".main-heading", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });

    // Animate paragraphs with stagger
    gsap.from(".intro-paragraph", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.4,
      ease: "power2.out",
    });

    // Animate section heading
    gsap.from(".section-heading", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <Container ref={containerRef}>
      <span className="text-4xl wave-emoji">👋</span>
      <Heading className="font-black main-heading">Hello there! I&apos;m Dipendra</Heading>
      <Paragraph className="max-w-xl mt-4 intro-paragraph">
        I&apos;m a results-driven full-stack developer specializing in
        <Highlight>Rust, Java, Python, .NET, and cloud solutions</Highlight>. I'm passionate about
        building robust, scalable applications and payment systems that handle real-world challenges.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4 intro-paragraph">
        Currently, I&apos;m a Senior Software Engineer at Bytescare, with
        <Highlight>{years} years, {months} months and {days} days</Highlight> of
        hands-on experience architecting scalable CRM workflows, data orchestration pipelines, and optimizing REST APIs.
      </Paragraph>

      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4 section-heading"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
