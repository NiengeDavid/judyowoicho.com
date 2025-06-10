import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { blogType } from "./blogType";
import { authorType } from "./authorType";
import { youtubeType } from "./youtubeType";
import { bookType } from "./booksType";
import { aboutType } from "./aboutType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    blogType,
    authorType,
    youtubeType,
    bookType,
    aboutType,
  ],
};
