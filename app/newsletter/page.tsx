import NewsletterPage from "@/containers/newsletterPage";
import type { Metadata } from "next";

import { newsletterDetails } from "@/data/newsletterDetails";

export const metadata: Metadata = {
  title: newsletterDetails?.pageMetadata.title,
  description: newsletterDetails?.pageMetadata.description,
};

export default function Newsletter() {
  return (
    <div className="w-full">
      <NewsletterPage />
    </div>
  );
}
