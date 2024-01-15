import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Famous People" },
        { name: "Movies & TV" },
        { name: "Musicians" },
        { name: "Games" },
        { name: "Animals" },
        { name: "Philosophy" },
        { name: "Scientists" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories:", error);
  } finally {
    await db.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeded default categories");
    db.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    db.$disconnect();
  })
  .finally(() => {
    console.log("Disconnecting from database...");
    db.$disconnect();
  });
