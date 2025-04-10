import {Metadata} from "next";
import {Container} from "@/components/Container";
import {Paragraph} from "@/components/Paragraph";
import {Heading} from "@/components/Heading";
import {Contact} from "@/components/Contact";


export const metadata: Metadata = {
  title: "Contact | Dipendra Bhardwaj",
  description:
    "Dipendra Bhardwaj is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function ContactPage() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Contact Me</Heading>
      <Paragraph className="mb-10 max-w-xl">
        Reach out to me over email or fill up this contact form. I will get back
        to you ASAP - I promise.{" "}
      </Paragraph>
      <Contact />
    </Container>
  );
}
