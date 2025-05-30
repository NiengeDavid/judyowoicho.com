// Example static blogs data (normally fetched from Sanity)
export const blogs = [
  {
    _id: "a333a65e-2fd4-44b1-9c44-45904fff940c",
    title:
      "Strategic Communication in Public Healthcare",
    slug: {
      current:
        "strategic-communication-in-public-healthcare-bridging-the-gap-between-policy-and-the-people",
    },
    mainImage: {
      asset: {
        url: "/assets/gift.jpg", // Put your static image in public/assets/
      },
      alt: "Healthcare Professional in Clinic",
    },
    body: [
      {
        _key: "79d7ce7d90ec",
        _type: "block",
        children: [
          {
            _key: "fc9221ece6cb",
            _type: "span",
            marks: [],
            text: "In an era where misinformation can spread faster than disease, ",
          },
          {
            _key: "74ac97318cad",
            _type: "span",
            marks: ["strong"],
            text: "strategic communication",
          },
          {
            _key: "211b750f3915",
            _type: "span",
            marks: [],
            text: " in public healthcare is not just an option—it is a necessity...",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      // ... more blocks (see your original JSON)
    ],
    publishedAt: "2025-05-28T11:14:26.043Z",
  },
  // Add more blog objects here as needed
];
