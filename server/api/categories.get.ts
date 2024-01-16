import { db } from "../../prisma";

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
  const categories = await db.category.findMany();
  return categories;
});
