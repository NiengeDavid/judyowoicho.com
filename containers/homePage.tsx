import Layout from "@/components/layout";
import BlogCard from "@/components/blogcard";
import { blogs } from "@/data/blogs";

export default function HomePage() {
  return (
    <Layout>
      <div className="text-black mx-auto">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </Layout>
  );
}
