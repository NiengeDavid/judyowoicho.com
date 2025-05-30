import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  // You can extend or style these as needed
  block: {
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-6 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) =>
      value?.href ? (
        <a
          href={value.href}
          className="text-secondary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        children
      ),
  },
  types: {
    image: ({ value }) =>
      value?.asset?._ref ? (
        <img
          src={urlFor(value.asset._ref).url()} // Generates the image URL
          alt={value.alt || ""}
          className="my-4 rounded"
        />
      ) : null,
  },
};

export default function PortableTextRenderer({
  blocks,
}: {
  blocks: any[] | undefined;
}) {
  return <PortableText value={blocks || []} components={components} />;
}
