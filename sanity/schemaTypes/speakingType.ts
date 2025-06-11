import { MicrophoneIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const speakingType = defineType({
  name: "speaking",
  title: "Speaking",
  type: "document",
  icon: MicrophoneIcon,
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
      type: "blockContent",
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
