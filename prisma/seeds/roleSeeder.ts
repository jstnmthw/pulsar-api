import { PrismaClient } from '@prisma/client';

export async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.deleteMany();

  console.log('Seeding roles...');

  await prisma.role.createMany({
    data: [
      {
        name: 'User',
        createdAt: new Date(),
      },
      {
        name: 'Admin',
        createdAt: new Date(),
      },
    ],
  });

  console.log('Done.');
}
