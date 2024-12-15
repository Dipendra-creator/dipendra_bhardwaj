import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { SingleProduct } from "@/components/Product";
import { Products } from "@/components/Products";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug) as Product | undefined;
  
  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }
  
  return {
    title: "Projects | Dipendra Bhardwaj",
    description:
      "Dipendra Bhardwaj is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
  };
}

export default async function SingleProjectPage({ params }: any) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    redirect("/projects");
  }
  
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}
