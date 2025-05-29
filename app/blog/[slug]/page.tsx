import { blogs } from "@/data/blogs";
import PortableTextRenderer from "@/components/portableTextRenderer";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Layout from "@/components/layout";
import Image from "next/image";

type Params = { params: { slug: string } };

export default function BlogSlugPage({ params }: Params) {
  const blog = blogs.find((b) => b.slug.current === params.slug);
  if (!blog) return notFound();

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
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-secondary hover:text-primary"
                href="/blog"
              >
                Blog
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{blog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="my-8">
          <h1 className="text-4xl pb-2 font-oswald text-primary font-normal">
            {blog.title}
          </h1>
          <span className="text-gray-400 font-serif text-lg">
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {blog.mainImage?.asset?.url && (
          <Image
            width={600}
            height={678}
            src={blog.mainImage.asset.url}
            alt={blog.mainImage.alt || blog.title}
            className="w-full h-fit object-cover rounded mb-6"
          />
        )}
        <PortableTextRenderer blocks={blog.body} />
      </Layout>
    </div>
  );
}
