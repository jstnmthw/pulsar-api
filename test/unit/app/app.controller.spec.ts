import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return app info', () => {
      expect(appController.getInfo()).toEqual({
        name: 'Pulsar API',
        version: '0.0.1',
      });
    });
  });
});
