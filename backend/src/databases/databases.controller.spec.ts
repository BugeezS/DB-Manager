import { Test, TestingModule } from '@nestjs/testing';
import { DatabasesController } from './databases.controller';

describe('DatabasesController', () => {
  let controller: DatabasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabasesController],
    }).compile();

    controller = module.get<DatabasesController>(DatabasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
