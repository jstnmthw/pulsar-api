import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';

describe('AuthModule', () => {
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

  it('should be defined', () => {
    expect(authModule).toBeDefined();
    authModule.useLogger(new Logger());
  });
});
