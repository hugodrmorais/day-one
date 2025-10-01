import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "sve7s4bq",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: false,
});
