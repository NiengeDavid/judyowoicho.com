import { PanelLeftIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const leftsideType = defineType({
  name: "leftside",
  title: "Leftside",
  type: "document",
  icon: PanelLeftIcon,
  fields: [
    defineField({
      name: "books",
      title: "Books",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Coming Soon", value: "comingSoon" },
                  { title: "Read My Books", value: "readMyBooks" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
            defineField({
              name: "coverImage",
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
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "books[0].type",
      subtitle: "books[0].url",
      media: "books[0].coverImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || "No type selected",
        subtitle: subtitle || "No URL provided",
        media: media,
      };
    },
  },
});
