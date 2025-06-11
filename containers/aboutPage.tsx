"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient, getAbout } from "@/sanity/lib/sanity.client";
import { getAboutQuery, type About } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import PortableTextRenderer from "@/components/portableTextRenderer";

export default function AboutPage() {
  const client = getClient({ token: readToken });
  const [about, setAbout] = useState<About | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      setIsLoading(true);
      try {
        const aboutData = await getAbout(client);
        setAbout(aboutData);
        //console.log("About Data:", aboutData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching about data; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

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
    <section className="w-full">
      <Layout className="my-6 lg:px-4">
        <h2 className="text-4xl font-normal font-oswald mb-6 text-primary">
          {about?.title || "About Me"}
        </h2>
        <div className="px-4 py-2 my-8 bg-creamy/50 rounded-lg shadow-sm">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
            {[
              { href: "#bio", label: "Bio" },
              { href: "#faqs", label: "FAQs" },
              { href: "#video", label: "Video" },
              { href: "#press", label: "Press & Interviews" },
              { href: "/contact", label: "Contact Me" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-secondary hover:text-primary hover:underline transition-colors duration-200 font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        {about?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={about.mainImage.url}
            alt={about.mainImage.alt || about.title}
            className="w-full h-fit object-cover rounded mb-4"
            priority
          />
        )}

        {/* Photo credicts */}
        <div className="w-full mb-6">
          <span className="text-primary text-sm text-start">
            Photo Credicts:{" "}
            <a
              href={about?.photoCredits?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              {about?.photoCredits?.name || "Unknown Photographer"}
            </a>
          </span>
        </div>

        {/* Body Section */}
        <div className="mb-8">
          {about?.body?.map((section) => (
            <div key={section.scroll} id={section.scroll} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {section.title}
              </h3>
              <PortableTextRenderer blocks={section.body} />
            </div>
          ))}
        </div>
      </Layout>
    </section>
  );
}
