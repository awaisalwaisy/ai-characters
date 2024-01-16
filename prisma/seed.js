import { PrismaClient } from "@prisma/client";

const prismaDb = new PrismaClient();

async function main() {
  try {
    await prismaDb.category.createMany({
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
    await prismaDb.$disconnect();
  }
}

main()
  .then(() => {
    console.log("Seeded default categories");
    prismaDb.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    prismaDb.$disconnect();
  })
  .finally(() => {
    console.log("Disconnecting from database...");
    prismaDb.$disconnect();
  });
