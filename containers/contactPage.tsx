"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient, getContact } from "@/sanity/lib/sanity.client";
import { type Contact } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import PortableTextRenderer from "@/components/portableTextRenderer";

export default function ContactPage() {
  const client = getClient({ token: readToken });
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const contactData = await getContact(client);
        setContact(contactData);
        //console.log("Contact Data:", contactData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching contact data; kindly check your internet connection.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
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
          {contact?.title || "contact me"}
        </h2>
        <div className="px-4 py-2 my-8 bg-creamy/50 rounded-lg shadow-sm">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none">
            {[
              { href: "#email", label: "Email" },
              { href: "#mail", label: "Mailing address" },
              { href: "#student", label: "NB:Students" },
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
        {contact?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={contact.mainImage.url}
            alt={contact.mainImage.alt || contact.title}
            className="w-full h-fit object-cover rounded mb-8"
            priority
          />
        )}

        {/* Photo credicts
        <div className="w-full mb-6">
          <span className="text-primary text-sm text-start">
            Photo Credicts:{" "}
            <a
              href={contact?.photoCredits?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              {contact?.photoCredits?.name || "Unknown Photographer"}
            </a>
          </span>
        </div> */}

        {/* Body Section */}
        <div className="mb-8">
          {contact?.body?.map((section) => (
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
