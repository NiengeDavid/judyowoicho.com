"use client";

import React, { useEffect, useState } from "react";
import PortableTextRenderer from "@/components/portableTextRenderer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Layout from "@/components/layout";
import Image from "next/image";
import { readToken } from "@/sanity/lib/sanity.api";
import { getBlogBySlug, getClient } from "@/sanity/lib/sanity.client";
import { type Blog } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

interface Params {
  params: Promise<{ slug: string }>;
}

export default function BlogSlugPage({ params }: Params) {
  const client = getClient({ token: readToken });
  const [blog, setBlog] = useState<Blog | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        if (slug) {
          const blogData = await getBlogBySlug(client, slug);
          if (Array.isArray(blogData) && blogData.length > 0) {
            setBlog(blogData[0]);
          } else {
            setBlog(null);
          }
          //console.log("Blog Data:", blogData);
        } else {
          setBlog(null);
        }
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
  }, [slug]);

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
    <div>
      <Layout>
        <Breadcrumb className="bg-creamy/50 py-4 px-3 rounded">
          <BreadcrumbList>
            <span className="text-primary">You are Here:</span>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-secondary hover:text-primary"
                href="/"
              >
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-secondary hover:text-primary">
                {blog?.categories[0]?.title || "Communication"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{blog?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="my-8">
          <h1 className="text-4xl pb-2 font-oswald text-primary font-normal">
            {blog?.title}
          </h1>
          <span className="text-gray-400 font-serif text-lg">
            {blog?.publishedAt &&
              new Date(blog.publishedAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </span>
        </div>
        {blog?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={blog.mainImage.url}
            alt={blog.mainImage.alt || blog.title}
            className="w-full h-fit object-cover rounded mb-6"
            priority
          />
        )}
        <PortableTextRenderer blocks={blog?.body} />
        <div className="flex items-center gap-2 border-t border-gray-300 py-4 mt-8 font-serif">
          <h2 className="text-lg text-primary">Filed Under:</h2>
          <p className="text-secondary text-lg">
            {blog?.categories?.length
              ? blog.categories.map((category) => category.title).join(", ")
              : "Communication"}
          </p>
        </div>
      </Layout>
    </div>
  );
}
