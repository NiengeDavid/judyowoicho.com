import BooksPage from "@/containers/booksPage";
import type { Metadata } from "next";

import { booksDetails } from "@/data/booksDetails";

export const metadata: Metadata = {
  title: booksDetails?.pageMetadata.title,
  description: booksDetails?.pageMetadata.description,
};


export default function Books() {
  return (
    <div className="w-full">
      <BooksPage />
    </div>
  );
}
