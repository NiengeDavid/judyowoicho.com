import { groq } from "next-sanity";

// Base product fields
const blogFields = groq`
  _id,
  title,
  slug,
  "authorName": author->name,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
  categories[]->{
    title
  },
  publishedAt,
  body
`;

//base book fields
const bookFields = groq`
  _id,
  title,
  slug,
  description,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
  body
`;

// Get all available blogs
export const getAllBlogsQuery = groq`
  *[_type == "blog"] | order(_createdAt asc) {
    ${blogFields}
  }
`;

// Get a single product by slug
export const getBlogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    ${blogFields}
  }
`;

//Get all available books
export const getAllBooksQuery = groq`
  *[_type == "book"] | order(_createdAt asc) {
    ${bookFields}
  }
`;

// Get single book by slug
export const getBookBySlugQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    ${bookFields}
  }
`;

//Get about Page
export const getAboutQuery = groq`
  *[_type == "about"][0] {
    _id,
    title,
    photoCredits[0]{
      name,
      url
    },
    "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
    body[]{
      title,
      scroll,
      body
    }
  }
`;

//Get contact Page
export const getContactQuery = groq`
  *[_type == "contact"][0] {
    _id,
    title,
    "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
    body[]{
      title,
      scroll,
      body
    }
  }
`;

//Get Speaking Page
export const getSpeakQuery = groq`
  *[_type == "speaking"][0] {
    _id,
    title,
    "mainImage": mainImage{
    "url": asset->url,
    "alt": alt
  },
   body,
}
`;

export interface SanityImage {
  url: string;
  alt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  authorName: string;
  mainImage: SanityImage;
  categories: {
    title: string;
  }[];
  publishedAt: string;
  body: Array<{
    _key: string;
    _type: string;
    children: Array<{
      _key: string;
      _type: string;
      marks: string[];
      text: string;
    }>;
    markDefs: Array<{
      _key: string;
      _type: string;
      href?: string;
    }>;
    style?: string;
    listItem?: string;
    level?: number;
  }>;
}

export interface Book {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: any;
  mainImage: SanityImage;
  body: any;
}

export interface About {
  _id: string;
  title: string;
  photoCredits: {
    name: string;
    url: string;
  };
  mainImage: {
    url: string;
    alt?: string;
  };
  body: {
    title: string;
    scroll: string;
    body: any; // Portable Text for body content
  }[];
}

export interface Contact {
  _id: string;
  title: string;
  mainImage: {
    url: string;
    alt?: string;
  };
  body: {
    title: string;
    scroll: string;
    body: any; // Portable Text for body content
  }[];
}

export interface Speak {
  _id: string;
  title: string;
  mainImage: {
    url: string;
    alt?: string;
  };
  body: any;
}
