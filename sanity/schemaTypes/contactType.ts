import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineField({
          name: "bodyItems",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "scroll",
              type: "string",
            }),
            defineField({
              name: "body",
              type: "blockContent",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media,
      };
    },
  },
});
