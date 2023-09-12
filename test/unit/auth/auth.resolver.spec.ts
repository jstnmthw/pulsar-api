import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthResolver', () => {
	let authModule: TestingModule;

	beforeAll(async () => {
		authModule = await Test.createTestingModule({
			providers: [
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn().mockReturnValue({
							bcryptSaltOrRound: 10,
							JWT_ACCESS_SECRET: 'secret',
						}),
					},
				},
			],
		}).compile();
	});

	afterAll(async () => {
		await authModule.close();
	});

	it('should login', () => {
		//..
	});
});
