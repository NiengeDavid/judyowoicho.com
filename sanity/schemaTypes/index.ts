import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { blogType } from "./blogType";
import { authorType } from "./authorType";
import { youtubeType } from "./youtubeType";
import { bookType } from "./booksType";
import { aboutType } from "./aboutType";
import { contactType } from "./contactType";
import { speakingType } from "./speakingType";
import { leftsideType } from "./leftsideType";
import { rightsideType } from "./rightsideType";
import { socialLinksType } from "./socialsType";
import { sercicesType } from "./servicesType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    blogType,
    authorType,
    youtubeType,
    bookType,
    aboutType,
    contactType,
    speakingType,
    leftsideType,
    rightsideType,
    socialLinksType,
    sercicesType,
  ],
};
