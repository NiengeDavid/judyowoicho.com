"use client";

import { useState, useEffect } from "react";
import BooksCard from "@/components/bookscard";
import { readToken } from "@/sanity/lib/sanity.api";
import { getAllBooks, getClient } from "@/sanity/lib/sanity.client";
import { type Book } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Container from "@/components/container";

export default function BooksPage() {
  const client = getClient({ token: readToken });
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const bookData = await getAllBooks(client);
        setBooks(bookData);
        //console.log("Books Data:", bookData);
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

    fetchBooks();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <div className="text-center text-primary font-serif text-2xl">
          Loading...
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full p-6">
      <BooksCard books={books} />
    </div>
  );
}
