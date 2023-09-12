// config.mock.ts

const configMock = {
	get: jest.fn().mockImplementation(() => {
		return {
			expiresIn: '2m',
			refreshIn: '7d',
			bcryptSaltOrRound: 10,
			JWT_ACCESS_SECRET: 'secret',
			JWT_REFRESH_SECRET: 'secret',
		};
	}),
};

export default configMock;
