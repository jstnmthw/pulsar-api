// prisma.mock.ts

import { User } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

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
					role: 'USER',
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
				throw new ConflictException(`Email ${params.data.email} already used.`);
			}
			return {
				accessToken: 'accessToken',
				refreshToken: 'refreshToken',
			};
		}),
	},
};

export default prismaMock;
