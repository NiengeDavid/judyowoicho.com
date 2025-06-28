import { PanelRightIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const rightsideType = defineType({
  name: "rightside",
  title: "Rightside",
  type: "document",
  icon: PanelRightIcon,
  fields: [
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
    defineField({
      name: "bio",
      type: "text",
      title: "Bio",
      rows: 5,
    }),
    defineField({
      name: "newsletterBio",
      type: "text",
      title: "Newsletter Bio",
      rows: 5,
    }),
  ],
  preview: {
    select: {
      title: "bio",
      subtitle: "newsletterBio",
      media: "coverImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
