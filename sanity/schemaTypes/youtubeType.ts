import {defineType} from "sanity";
import {PlayIcon} from "@sanity/icons";

export const youtubeType = defineType({
  name: "youtube",
  title: "YouTube Embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube Video URL",
      description: "Paste the YouTube share URL (e.g. https://youtu.be/xyz or https://www.youtube.com/watch?v=xyz)",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    },
  ],
  preview: {
    select: {url: "url"},
    prepare({url}) {
      return {
        title: url ? `YouTube: ${url}` : "YouTube: No URL",
      };
    },
  },
});