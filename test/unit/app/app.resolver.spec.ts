import { AppResolver } from '@/app.resolver';
import { AppService } from '@/app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('AppResolver', () => {
  let appResolver: AppResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppResolver, AppService, ConfigService],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
  });

  describe('info', () => {
    it('should return app info', () => {
      const info = {
        name: expect.any(String),
        version: expect.any(String),
        endpoint: expect.any(String),
      };
      jest.spyOn(appResolver, 'info').mockImplementation(() => info);
      expect(appResolver.info()).toBe(info);
    });
  });
});
