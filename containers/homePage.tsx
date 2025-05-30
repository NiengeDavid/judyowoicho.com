"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import BlogCard from "@/components/blogcard";
import { readToken } from "@/sanity/lib/sanity.api";
import { getAllBlogs, getClient } from "@/sanity/lib/sanity.client";
import { type Blog } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

export default function HomePage() {
  const client = getClient({ token: readToken });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const blogData = await getAllBlogs(client);
        setBlogs(blogData);
        //console.log("Blog Data:", blogData);
      } catch (error) {
        //console.error("Error fetching blogs:", error);
        toast("Network Error", {
          description:
            "Error fetching blogs; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center text-primary font-serif text-2xl">
          Loading...
        </div>
      </Layout>
    );
  }

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
