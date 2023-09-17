import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configMock from '@mock/config.mock';

describe('AuthResolver', () => {
  let authModule: TestingModule;

  beforeAll(async () => {
    authModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configMock,
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
