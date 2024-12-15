import { StaticImageData } from "next/image";

export type Product = {
  title: string;
  description: string;
  thumbnail: any;
  images: any[];
  href: string;
  slug?: string;
  stack?: string[];
  content?: any;
};
