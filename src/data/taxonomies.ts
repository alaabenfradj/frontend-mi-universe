import __taxonomies from "./jsons/__taxonomies.json";
import { TaxonomyType } from "./types";
import tags from "./jsons/tags.json";

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category",
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag",
}));

const STUDENT_TAGS: TaxonomyType[] = tags.map((item) => ({
  ...item,
  taxonomy: "tag",
}));

export { DEMO_CATEGORIES, DEMO_TAGS, STUDENT_TAGS };
