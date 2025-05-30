"use client";

import { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTumblr,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Input } from "./ui/input";
import Container from "./container";
import { readToken } from "@/sanity/lib/sanity.api";
import { getAllBlogs, getClient } from "@/sanity/lib/sanity.client";
import { type Blog } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

export default function FooterTop() {
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

  return (
    <div className="bg-black font-serif text-white py-12 px-4 md:px-20">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4">Recent Posts</h3>
          <ul className="space-y-2 text-secondary text-lg">
            {blogs.slice(0, 5).map((blog) => (
              <li
                key={blog.slug.current}
                className="border-b border-gray-700 pb-1"
              >
                <a
                  href={`/blog/${blog.slug.current}`}
                  className="hover:underline"
                >
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* More About Me */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4">More About Me</h3>
          <ul className="space-y-2 text-secondary text-lg">
            <li className="border-b border-gray-700 pb-1">
              <a href="/books" className="hover:underline">
                Books I’ve written
              </a>
            </li>
            <li className="border-b border-gray-700 pb-1">
              <a href="/newsletter" className="hover:underline">
                My newsletter
              </a>
            </li>
            <li className="border-b border-gray-700 pb-1">
              <a href="/books-read" className="hover:underline">
                Books I’ve read
              </a>
            </li>
            <li className="border-b border-gray-700 pb-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
            <li className="border-b border-gray-700 pb-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
            <li className="border-b border-gray-700 pb-1">
              <a
                href="https://tumblr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Tumblr
              </a>
            </li>
          </ul>
        </div>

        {/* Search & Social */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4">Search This Site</h3>
          <Input
            type="text"
            placeholder="Search this website"
            className="w-full p-3 py-6 bg-gray-100 text-black rounded mb-8"
          />

          <h3 className="text-sm font-bold uppercase mb-4">
            Follow Me Elsewhere
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
            >
              <FaFacebook className="text-white w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
            >
              <FaInstagram className="text-white w-6 h-6" />
            </a>
            <a
              href="https://tumblr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
            >
              <FaTumblr className="text-white w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
            >
              <FaTwitter className="text-white w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
            >
              <FaYoutube className="text-white w-6 h-6" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
