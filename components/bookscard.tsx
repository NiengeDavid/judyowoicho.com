import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { type Book } from "@/sanity/lib/sanity.queries";
import PortableTextRenderer from "@/components/portableTextRenderer";

export default function BooksCard({ books }: { books: Book[] }) {
  return (
    <Container className="">
      <div className="mb-6">
        <h1 className="text-4xl font-oswald text-primary font-normal text-start mb-2">
          Books
        </h1>
        <span className="text-xl font-medium font-sans text-black/50 text-start">
          Get signed copies{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            from Bookpeople
          </a>
          , and don’t miss{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:underline"
          >
            the audiobook trilogy.
          </a>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.slug.current} className="mb-6 lg:px-4">
            {book.mainImage?.url && (
              <Link href={`/book/${book.slug.current}`}>
                <Image
                  src={book.mainImage.url}
                  width={600}
                  height={687}
                  priority
                  alt={book.mainImage.alt || book.title}
                  className="w-full h-fit object-cover mb-3"
                />
              </Link>
            )}
            <Link href={`/book/${book.slug.current}`}>
              <h2 className="text-2xl font-normal font-oswald mt-6 mb-2 italic text-secondary hover:text-primary cursor-pointer">
                {book.title}
              </h2>
            </Link>
            <PortableTextRenderer blocks={book?.description} />
            <Link
              href={`/book/${book.slug.current}`}
              className="text-sm text-secondary hover:underline"
            >
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
}
