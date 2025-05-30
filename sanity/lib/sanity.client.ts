import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
} from "@/sanity/lib/sanity.api";

import { createClient, type SanityClient } from "next-sanity";
import { getAllBlogsQuery, type Blog } from "./sanity.queries";

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  });

  // If preview is provided and has a token, return a client with the token
  if (preview?.token) {
    return client.withConfig({
      token: preview.token,
    });
  }

  // Otherwise, return the default client
  return client;
}

export const getSanityImageConfig = () => getClient();

// Fetch all available products
export async function getAllBlogs(client: SanityClient): Promise<Blog[]> {
  return await client.fetch(getAllBlogsQuery);
}

// Fetch a single product by slug
export async function getBlogBySlug(
  client: SanityClient,
  slug: string
): Promise<Blog | null> {
  return await client.fetch(getAllBlogsQuery, { slug });
}
