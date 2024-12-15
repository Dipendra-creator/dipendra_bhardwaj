import { Container } from "@/components/Container";

import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  let join_date = new Date("2022-07-11");

  let total_experience = new Date(new Date().getTime() - join_date.getTime());
  let years = total_experience.getUTCFullYear() - 1970;
  let months = total_experience.getUTCMonth();
  let days = total_experience.getUTCDate();


  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">Hello there! I&apos;m Dipendra</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a full-stack developer specializing in
        <Highlight>Angular, .NET Core, and MySQL</Highlight>. I'm passionate about
        building scalable applications and exploring new technologies like Elixir
        and Kubernetes.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Currently, I&apos;m a senior software engineer at IntelliWings, with
        <Highlight>{years} years, {months} months and {days} days</Highlight> of
        experience in developing enterprise-grade applications.
      </Paragraph>

      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
