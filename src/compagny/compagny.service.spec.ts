import { Test, TestingModule } from '@nestjs/testing';
import { CompagnyService } from './compagny.service';

describe('CompagnyService', () => {
  let service: CompagnyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompagnyService],
    }).compile();

    service = module.get<CompagnyService>(CompagnyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
