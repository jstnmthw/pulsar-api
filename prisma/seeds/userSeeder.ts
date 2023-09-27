import { Prisma, PrismaClient } from '@prisma/client';

export async function userSeeder(prisma: PrismaClient) {
  // Delete all users and their roles
  await prisma.user.deleteMany();

  console.log('Seeding users...');

  // Create users with hashed passwords (using bcrypt)
  const usersData: Prisma.UserCreateInput[] = [
    {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      createdAt: new Date(),
    },
    {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      createdAt: new Date(),
    },
  ];

  await Promise.all(
    // Map each user to the promise returned by prisma.user.create
    usersData.map((user) => prisma.user.create({ data: user })),
  );

  console.log('Done.');
}
