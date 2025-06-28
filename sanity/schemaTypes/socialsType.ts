import { defineField, defineType } from "sanity";
import { MobileDeviceIcon } from "@sanity/icons";

export const socialLinksType = defineType({
  name: "socialLinks",
  title: "Social Links",
  icon: MobileDeviceIcon,
  type: "document",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      description:
        "The name of the social media platform (e.g., Facebook, Twitter).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "The URL to the social media profile.",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "The name of the icon (e.g., FaFacebook, FaTwitter).",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
  },
});
