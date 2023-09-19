import { PrismaClient } from '@prisma/client';

export async function userSeeder(prisma: PrismaClient) {
  await prisma.user.deleteMany();

  console.log('Seeding users...');

  await prisma.user.createMany({
    data: [
      {
        email: 'lisa@simpson.com',
        firstname: 'Lisa',
        lastname: 'Simpson',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
      },
      {
        email: 'bart@simpson.com',
        firstname: 'Bart',
        lastname: 'Simpson',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      },
    ],
  });

  console.log('Done.');
}
