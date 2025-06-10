import AboutPage from "@/containers/aboutPage";
import type { Metadata } from "next";

import { aboutDetails } from "@/data/aboutDetails";

export const metadata: Metadata = {
  title: aboutDetails?.pageMetadata.title,
  description: aboutDetails?.pageMetadata.description,
};

export default function About() {
  return (
    <div className="w-full">
      <AboutPage />
    </div>
  );
}
