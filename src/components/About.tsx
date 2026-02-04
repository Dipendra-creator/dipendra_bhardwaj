"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import {Heading} from "@/components/Heading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      // Animate content sections on scroll
      gsap.from(".about-section", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "all",
      });

      // Animate list items
      gsap.from(".about-list li", {
        scrollTrigger: {
          trigger: ".about-list",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  }, { scope: containerRef });
  
  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4 about-section">
          I'm a results-driven Software Engineer with over 3 years of hands-on experience in full stack development, cloud solutions, and payment systems. I've built robust, scalable applications using cutting-edge technologies like Rust, Java, .NET, and Python. My journey in tech has seen me architecting real-time monitoring systems, modernizing legacy infrastructures, and optimizing ETL workflows that handle massive datasets.
        </Paragraph>
        <Heading className="text-lg mt-4 about-section">🚀 Current Role & Recent Achievements:</Heading>
        <div className="text-sm lg:text-base font-normal text-secondary mt-4 about-section">
          <ul className={"list-disc pl-4 about-list"}>
            <li>At Bytescare, I architect modular CRM workflows and develop Dagster-based data orchestration pipelines with AI-driven insights for automated report generation.</li>
            <li>At IntelleWings, I led projects from NFT transaction monitoring systems to dynamic Re-KYC risk assessment solutions using Apache Kafka and Python.</li>
            <li>Built a highly scalable rule engine using Java and Drools with 500+ rules for banking, NFTs, and insurance domains.</li>
            <li>Optimized ETL workflows using Rust and Diesel.rs ORM, delivering outstanding performance for complex datasets.</li>
          </ul>
        </div>
        <Heading className="text-lg mt-4 about-section">📚 Technical Expertise:</Heading>
        <div className="text-sm lg:text-base font-normal text-secondary mt-4 about-section">
          <ul className={"list-disc pl-4 about-list"}>
            <li>Languages: Java, Rust, Python, .NET, TypeScript, JavaScript</li>
            <li>Backend: Spring Boot, .NET Core, Apache Kafka, Dagster</li>
            <li>Frontend: React, Next.js, Angular, Tailwind CSS</li>
            <li>Databases: MySQL, PostgreSQL, MongoDB</li>
            <li>DevOps & Tools: Docker, Kubernetes, Linux, Apache Spark, Git</li>
            <li>Certifications: Sustainability and Corporate ESG</li>
          </ul>
        </div>
        <Paragraph className=" mt-4 about-section">
          💡 I'm passionate about continuous learning and collaboration. I've developed open-source projects like LazzyORM (available on PyPI), focusing on simplicity and developer productivity. Whether it's crafting lightweight ORMs or innovating data processing pipelines, I turn complex challenges into smart, scalable solutions.
        </Paragraph>
        <Paragraph className=" mt-4 about-section">
          🎓 Education: Bachelor's degree in Computer Science from GLA University (2019-2023)
        </Paragraph>
        <Paragraph className=" mt-4 about-section">
          ✨ Let's connect and explore how we can drive tech innovation together!
        </Paragraph>

      </div>
    </div>
  );
}
