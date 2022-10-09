import { Test, TestingModule } from '@nestjs/testing';
import { CompagnyController } from './compagny.controller';

describe('CompagnyController', () => {
  let controller: CompagnyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompagnyController],
    }).compile();

    controller = module.get<CompagnyController>(CompagnyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
