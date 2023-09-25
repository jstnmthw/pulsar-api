import { Prisma, PrismaClient } from '@prisma/client';

export async function userSeeder(prisma: PrismaClient) {
  // Delete all users and their roles
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding users...');

  // Get all roles from the database to assign them to users
  const roles = await prisma.role.findMany();

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

  // Create users in the database and store the created users in an array
  const users = await Promise.all(
    // Map each user to the promise returned by prisma.user.create
    usersData.map((user) => prisma.user.create({ data: user })),
  );

  // Assign roles to users
  // For example, assign the 'user' role to Lisa and Bart
  await prisma.userRole.createMany({
    data: [
      {
        userId: users.find((user) => user.email === 'lisa@simpson.com').id,
        roleId: roles.find((role) => role.name === 'User').id,
      },
      {
        userId: users.find((user) => user.email === 'bart@simpson.com').id,
        roleId: roles.find((role) => role.name === 'Admin').id,
      },
      // Add more role assignments as needed
    ],
  });

  console.log('Done.');
}
