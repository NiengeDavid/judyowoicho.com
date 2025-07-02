"use client";

import { useState, useEffect } from "react";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient, getLeftside } from "@/sanity/lib/sanity.client";
import { Leftside } from "@/sanity/lib/sanity.queries";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

export default function LeftSidebar() {
  const client = getClient({ token: readToken });
  const [books, setBooks] = useState<Leftside | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeftSidebar = async () => {
      setIsLoading(true);
      try {
        const leftsideData = await getLeftside(client);
        setBooks(leftsideData);
        console.log("LeftSidebar Data:", leftsideData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching Left Sidebar data; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeftSidebar();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center text-primary font-serif text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <aside className="w-full p-4 text-black space-y-12">
      {[
        {
          title: "COMING SOON: THE STEAL LIKE AN ARTIST JOURNAL",
          type: "comingSoon",
        },
        { title: "READ MY BOOKS", type: "readMyBooks" },
      ].map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3 className="text-primary font-normal mb-3">{section.title}</h3>
          {books?.books
            .filter((book) => book.type === section.type)
            .map((book, bookIndex) => (
              <div key={bookIndex}>
                <Link href={book.url}>
                  <Image
                    src={book.coverImage.url || "/assets/steal.jpg"}
                    alt={book.coverImage.alt || section.title}
                    width={200}
                    height={300}
                  />
                </Link>
              </div>
            ))}
        </div>
      ))}
    </aside>
  );
}
