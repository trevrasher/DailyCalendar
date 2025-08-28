const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const deleted = await prisma.daily.deleteMany({
    where: { day, month, year }
  });
  console.log(`Deleted ${deleted.count} dailies for today.`);
}

main().finally(() => prisma.$disconnect());