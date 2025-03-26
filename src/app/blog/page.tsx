import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Blogs } from "@/components/Blogs";
import { getAllBlogs } from "@/lib/getAllBlogs";

export const metadata = {
  title: "Blog | Dipendra Bhardwaj",
  description: "Articles and thoughts about software development, technology, and more.",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  
  return (
    <Container>
      <span className="text-4xl">✍️</span>
      <Heading className="font-black">Blog</Heading>
      {blogs.length === 0 ? (
        <p className="text-gray-600 mt-4">No blog posts yet. Check back soon!</p>
      ) : (
        <Blogs blogs={blogs} />
      )}
    </Container>
  );
}