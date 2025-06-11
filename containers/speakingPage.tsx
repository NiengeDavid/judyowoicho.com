"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { readToken } from "@/sanity/lib/sanity.api";
import { getClient, getSpeak } from "@/sanity/lib/sanity.client";
import { type Speak } from "@/sanity/lib/sanity.queries";
import { toast } from "sonner";
import Image from "next/image";
import PortableTextRenderer from "@/components/portableTextRenderer";

export default function SpeakingPage() {
  const client = getClient({ token: readToken });
  const [speak, setSpeak] = useState<Speak | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const speakData = await getSpeak(client);
        setSpeak(speakData);
        //console.log("Speak Data:", speakData);
      } catch (error) {
        toast("Network Error", {
          description:
            "Error fetching Speak data; kindly check your internet connection.",
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
          {speak?.title || "contact me"}
        </h2>

        {/* Image */}
        {speak?.mainImage?.url && (
          <Image
            width={600}
            height={678}
            src={speak.mainImage.url}
            alt={speak.mainImage.alt || speak.title}
            className="w-full h-fit object-cover rounded mb-8"
            priority
          />
        )}

        {/* Body Section */}
        <div className="mb-8">
          <PortableTextRenderer blocks={speak?.body} />
        </div>
      </Layout>
    </section>
  );
}
