"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import BlogCard from "@/components/blogcard";
import Pagination from "@/components/pagination";
import { readToken } from "@/sanity/lib/sanity.api";
import { getAllBlogs, getClient } from "@/sanity/lib/sanity.client";
import { type Blog } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

const BLOGS_PER_PAGE = 5;

export default function HomePage() {
  const client = getClient({ token: readToken });
  const [page, setPage] = useState(1);
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

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const start = (page - 1) * BLOGS_PER_PAGE;
  const end = start + BLOGS_PER_PAGE;
  const paginatedBlogs = blogs.slice(start, end);

  return (
    <Layout>
      <div className="text-black mx-auto">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Layout>
  );
}
