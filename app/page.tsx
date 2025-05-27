import HomePage from "@/containers/homePage";
import type { Metadata } from "next";

import { indexDetails } from "@/data/indexDetails";

export const metadata: Metadata = {
  title: indexDetails?.pageMetadata.title,
  description: indexDetails?.pageMetadata.description,
};

export default function Home() {
  return (
    <div className="bg-white w-full">
      <HomePage />
    </div>
  );
}
