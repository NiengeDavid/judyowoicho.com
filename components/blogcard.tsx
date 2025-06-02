import Link from "next/link";
import Image from "next/image";
import { type Blog } from "@/sanity/lib/sanity.queries";

function getFirstParagraph(blocks: any[]): string {
  // Find first "normal" block with text
  const para = blocks.find(
    (block) =>
      block._type === "block" &&
      block.style === "normal" &&
      block.children &&
      block.children.length > 0
  );
  if (!para) return "";
  return para.children.map((span: any) => span.text).join("");
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="mb-6 lg:px-4">
      <Link href={`/blog/${blog.slug.current}`}>
        <h2 className="text-4xl font-normal font-oswald mb-6 text-primary hover:text-secondary cursor-pointer">
          {blog.title}
        </h2>
      </Link>
      {blog.mainImage?.url && (
        <Link href={`/blog/${blog.slug.current}`}>
          <Image
            src={blog.mainImage.url}
            width={600}
            height={687}
            alt={blog.mainImage.alt || blog.title}
            className="w-full h-fit object-cover mb-3"
          />
        </Link>
      )}
      <p className="mb-2 text-gray-700">{getFirstParagraph(blog.body)}</p>
      <Link
        href={`/blog/${blog.slug.current}`}
        className="text-sm text-secondary hover:underline"
      >
        Permalink
      </Link>

    </div>
  );
}
