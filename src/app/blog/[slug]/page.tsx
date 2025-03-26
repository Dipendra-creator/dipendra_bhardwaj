import { BlogLayout } from "@/components/BlogLayout";
import { getAllBlogs } from "@/lib/getAllBlogs";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blogs = await getAllBlogs();
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${blog.title} | Dipendra Bhardwaj`,
    description: blog.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const blogs = await getAllBlogs();
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const { default: Content } = await import(`../../../app/blog/${params.slug}/content.mdx`);

  return (
    <BlogLayout meta={blog}>
      <Content />
    </BlogLayout>
  );
}