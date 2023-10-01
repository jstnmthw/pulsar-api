import { PrismaClient } from '@prisma/client';
import { userSeeder } from './seeds/userSeeder';
import { roleSeeder } from './seeds/roleSeeder';

const prisma = new PrismaClient();

async function main() {
  await roleSeeder(prisma);
  await userSeeder(prisma);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
