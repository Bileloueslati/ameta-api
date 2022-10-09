import { Test, TestingModule } from '@nestjs/testing';
import { SheetContainerService } from './sheet-container.service';

describe('SheetContainerService', () => {
  let service: SheetContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetContainerService],
    }).compile();

    service = module.get<SheetContainerService>(SheetContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
