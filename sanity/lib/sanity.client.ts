import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
} from "@/sanity/lib/sanity.api";

import { createClient, type SanityClient } from "next-sanity";
import {
  About,
  Book,
  Contact,
  getAboutQuery,
  getAllBlogsQuery,
  getAllBooksQuery,
  getBlogBySlugQuery,
  getBookBySlugQuery,
  getContactQuery,
  getLeftsideQuery,
  getRightsideQuery,
  getServicesQuery,
  getSocialLinksQuery,
  getSpeakQuery,
  Leftside,
  Rightside,
  Service,
  Speak,
  type Blog,
  type SocialLink,
} from "./sanity.queries";

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

// Fetch all available blogs
export async function getAllBlogs(client: SanityClient): Promise<Blog[]> {
  return await client.fetch(getAllBlogsQuery);
}

// Fetch a single product by slug
export async function getBlogBySlug(
  client: SanityClient,
  slug: string
): Promise<Blog | null> {
  return await client.fetch(getBlogBySlugQuery, { slug });
}

// Fetch all available books
export async function getAllBooks(client: SanityClient): Promise<Book[]> {
  return await client.fetch(getAllBooksQuery);
}

//Fetch a single book by slug
export async function getBookBySlug(
  client: SanityClient,
  slug: string
): Promise<Book | null> {
  return await client.fetch(getBookBySlugQuery, { slug });
}

// Fetch about page content
export async function getAbout(client: SanityClient): Promise<About | null> {
  return await client.fetch(getAboutQuery);
}

// Fetch contact content
export async function getContact(
  client: SanityClient
): Promise<Contact | null> {
  return await client.fetch(getContactQuery);
}

// Fetch speaking content
export async function getSpeak(client: SanityClient): Promise<Speak | null> {
  return await client.fetch(getSpeakQuery);
}

// Fetch Services content
export async function getService(
  client: SanityClient
): Promise<Service | null> {
  return await client.fetch(getServicesQuery);
}

// Fetch social links
export async function getSocialLinks(
  client: SanityClient
): Promise<SocialLink[]> {
  return await client.fetch(getSocialLinksQuery);
}

// Fetch RightSidebar Content
export async function getRightside(
  client: SanityClient
): Promise<Rightside | null> {
  return await client.fetch(getRightsideQuery);
}

// Fetch LeftSidebar Content
export async function getLeftside(
  client: SanityClient
): Promise<Leftside | null> {
  return await client.fetch(getLeftsideQuery);
}
