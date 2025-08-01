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
import {
  getAllBlogs,
  getSocialLinks,
  getClient,
} from "@/sanity/lib/sanity.client";
import { SocialLink, type Blog } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Link from "next/link";

const moreAboutMeLinks = [
  { href: "/books", label: "Books I’ve written" },
  { href: "/newsletter", label: "My newsletter" },
  { href: "/books-read", label: "Books I’ve read" },
  { href: "https://twitter.com", label: "Twitter", external: true },
  { href: "https://instagram.com", label: "Instagram", external: true },
];

export default function FooterTop() {
  const client = getClient({ token: readToken });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [socials, setSocials] = useState<SocialLink[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const [socialData, blogData] = await Promise.all([
          getSocialLinks(client),
          getAllBlogs(client),
        ]);
        setBlogs(blogData);
        setSocials(socialData);
        //console.log("Blog Data:", blogData);
      } catch (error) {
        //console.error("Error fetching blogs:", error);
        toast("Network Error", {
          description:
            "Error fetching component data; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-primary font-serif text-white py-12 px-4 md:px-20">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4">Recent Posts</h3>
          <ul className="space-y-2 text-secondary text-lg">
            {blogs.slice(0, 5).map((blog) => (
              <li key={blog?._id} className="border-b border-gray-700 pb-1">
                {blog?.slug?.current ? (
                  <a
                    href={`/blog/${blog.slug.current}`}
                    className="hover:underline"
                  >
                    {blog.title}
                  </a>
                ) : (
                  <span className="text-gray-400">Invalid Blog</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* More About Me */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-4">More About Me</h3>
          <ul className="space-y-2 text-secondary text-lg">
            {moreAboutMeLinks.map((more) => (
              <li key={more?.href} className="border-b border-gray-700 pb-1">
                {more.external ? (
                  <a
                    href={more?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {more.label}
                  </a>
                ) : (
                  <Link href={more?.href} className="hover:underline">
                    {more.label}
                  </Link>
                )}
              </li>
            ))}
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
            {socials &&
              socials.map((link) => {
                const Icon =
                  link.icon === "FaFacebook"
                    ? FaFacebook
                    : link.icon === "FaInstagram"
                      ? FaInstagram
                      : link.icon === "FaTumblr"
                        ? FaTumblr
                        : link.icon === "FaTwitter"
                          ? FaTwitter
                          : link.icon === "FaYoutube"
                            ? FaYoutube
                            : () => <span>Unknown</span>;

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-black rounded-full p-2 bg-secondary flex items-center justify-center"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
}
