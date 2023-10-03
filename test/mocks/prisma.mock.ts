// prisma.mock.ts

import { Prisma, User } from '@prisma/client';

const prismaMock = {
  user: {
    findUnique: jest.fn().mockImplementation((params) => {
      const users = {
        '1': {
          id: '1',
          email: 'homer@simpson.com',
          password:
            '$2b$10$deZ/BJ2JxadVqET1xEEN4ekTF3a0F4d3TrVRs2nPqvZZ6aOHjqK/W', //password
          firstname: 'Homer',
          lastname: 'Simpson',
          createdAt: new Date(),
          updatedAt: new Date(),
        } as User,
      };

      if (params.where.id) {
        return users[params.where.id];
      }
      if (params.where.email) {
        return Object.values(users).find(
          (user) => user.email === params.where.email,
        );
      }
      return null;
    }),
    create: jest.fn().mockImplementation((params) => {
      if (params.data.email === 'homer@simpson.com') {
        throw new Prisma.PrismaClientKnownRequestError(undefined, {
          code: 'P2002',
          clientVersion: '2.30.1',
        });
      }

      if (params.data.email === '' || params.data.password === '') {
        throw Error('email is empty');
      }

      return {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      };
    }),
  },
};

export default prismaMock;
