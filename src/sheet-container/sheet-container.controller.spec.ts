import { Test, TestingModule } from '@nestjs/testing';
import { SheetContainerController } from './sheet-container.controller';

describe('SheetContainerController', () => {
  let controller: SheetContainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheetContainerController],
    }).compile();

    controller = module.get<SheetContainerController>(SheetContainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
