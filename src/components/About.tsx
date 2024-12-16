"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";
import {Heading} from "@/components/Heading";

export default function About() {
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <div>
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
        <Paragraph className=" mt-4">
          As a Software Engineer, I thrive on crafting innovative and scalable solutions that solve real-world problems. With a B.Tech in Computer Science from GLA University and industry experience at IntelliWings, I’ve built systems that blend cutting-edge technology with practical applications.
        </Paragraph>
        <Heading className="text-lg mt-4">🚀 Here’s a bit about my journey:</Heading>
        <Paragraph className=" mt-4">
          <ul className={"list-disc pl-4"}>
            <li>I specialize in backend development, having built a highly scalable rule engine using Java and Drools with 500+ rules for domains like banking, NFTs, and insurance.</li>
            <li>I spearheaded a real-time Re-KYC risk assessment system with Apache Kafka and Python, ensuring robust compliance for customer security.</li>
            <li>I have hands-on experience optimizing ETL workflows using Rust and Diesel.rs ORM, delivering outstanding performance for complex datasets.</li>
          </ul>
          💡 My passion for learning drives me to explore diverse technologies. I’ve developed projects like LazzyORM, a Python-based lightweight ORM available on PyPI, focusing on simplicity and developer productivity.
        </Paragraph>
        <Heading className="text-lg mt-4">📚 Technical Skills I bring to the table:</Heading>
        <Paragraph className=" mt-4">
          <ul className={"list-disc pl-4"}>
            <li>Languages & Frameworks: Java, Rust, Python, Spring Boot, Next.js, Angular, Tailwind CSS.</li>
            <li>Tools & Platforms: Docker, Apache Spark, MySQL, PostgreSQL, and Linux.</li>
            <li>Soft Skills: Leadership, adaptability, problem-solving, and creativity to overcome challenges.</li>
          </ul>
          ✨ When I’m not coding, I’m researching, brainstorming, and finding ways to turn ideas into impactful software solutions. Let’s connect and collaborate to create something amazing! 😊
        </Paragraph>

      </div>
    </div>
  );
}
