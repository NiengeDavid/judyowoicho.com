"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/layout";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient, getService } from "@/sanity/lib/sanity.client";
import { type Service } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Image from "next/image";
import PortableTextRenderer from "@/components/portableTextRenderer";

export default function ServicesPage() {
  const client = getClient({ token: readToken });
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const serviceData = await getService(client);
        setService(serviceData);
        //console.log("service Data:", serviceData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching Service data; kindly check your internet connection.",
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
          {service?.title || "contact me"}
        </h2>

        {/* Image */}
        {service?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={service.mainImage.url}
            alt={service.mainImage.alt || service.title}
            className="w-full h-fit object-cover rounded mb-8"
            priority
          />
        )}

        {/* Body Section */}
        <div className="mb-8">
          <PortableTextRenderer blocks={service?.body} />
        </div>
      </Layout>
    </section>
  );
}
