import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// --- YouTube ID extraction helper ---
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  // Support YouTube share and full URLs
  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

const components: PortableTextComponents = {
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
          src={urlFor(value.asset._ref).url()}
          alt={value.alt || ""}
          className="my-4 rounded"
        />
      ) : null,
    youtube: ({ value }) => {
      const videoId = getYouTubeId(value?.url);
      if (!videoId) return null;
      return (
        <div className="my-6 flex justify-center">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg w-full max-w-xl aspect-video"
          ></iframe>
        </div>
      );
    },
  },
};

export default function PortableTextRenderer({
  blocks,
}: {
  blocks: any[] | undefined;
}) {
  return <PortableText value={blocks || []} components={components} />;
}
