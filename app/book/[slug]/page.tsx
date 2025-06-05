"use client";

import React, { useEffect, useState } from "react";
import PortableTextRenderer from "@/components/portableTextRenderer";
import Layout from "@/components/layout";
import Image from "next/image";
import { readToken } from "@/sanity/lib/sanity.api";
import { getBookBySlug, getClient } from "@/sanity/lib/sanity.client";
import { type Book } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";

interface Params {
  params: Promise<{ slug: string }>;
}

export default function BookSlugPage({ params }: Params) {
  const client = getClient({ token: readToken });
  const [book, setBook] = useState<Book | null>();
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
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        if (slug) {
          const bookData = await getBookBySlug(client, slug);
          setBook(bookData);
          //console.log("Blog Data:", bookData);
        } else {
          setBook(null);
        }
      } catch (error) {
        //console.error("Error fetching books:", error);
        toast("Network Error", {
          description:
            "Error fetching books; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
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
        <div className="my-8">
          <h1 className="text-4xl pb-2 font-oswald text-primary font-normal">
            {book?.title}
          </h1>
          <div className="text-gray-500 text-2xl font-normal">
            <PortableTextRenderer blocks={book?.description} />
          </div>
        </div>
        {book?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={book.mainImage.url}
            alt={book.mainImage.alt || book.title}
            className="w-full h-fit object-cover rounded mb-6"
            priority
          />
        )}
        <PortableTextRenderer blocks={book?.body} />
      </Layout>
    </div>
  );
}
