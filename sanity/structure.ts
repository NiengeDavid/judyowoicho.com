import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.documentTypeListItem("blog").title("Blogs"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("book").title("Books"),
      S.documentTypeListItem("about").title("About Page"),
      S.documentTypeListItem("contact").title("Contact Page"),
      S.documentTypeListItem("speaking").title("Speaking Page"),
      S.documentTypeListItem("leftside").title("LeftSide Menu"),
      S.documentTypeListItem("rightside").title("RightSide Menu"),
      S.documentTypeListItem("socialLinks").title("Social Links"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "blog",
            "category",
            "author",
            "book",
            "about",
            "contact",
            "speaking",
            "leftside",
            "rightside",
            "socialLinks",
          ].includes(item.getId()!)
      ),
    ]);
