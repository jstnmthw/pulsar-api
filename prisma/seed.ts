import { PrismaClient } from '@prisma/client';
import { permissionSeeder } from './seeds/permissionSeeder';
import { roleSeeder } from './seeds/roleSeeder';
import { userSeeder } from './seeds/userSeeder';

const prisma = new PrismaClient();

async function main() {
  await permissionSeeder(prisma);
  await roleSeeder(prisma);
  await userSeeder(prisma);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
