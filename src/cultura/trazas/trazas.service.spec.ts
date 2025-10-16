import { Test, TestingModule } from '@nestjs/testing';
import { TrazasService } from './trazas.service';

describe('TrazasService', () => {
  let service: TrazasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrazasService],
    }).compile();

    service = module.get<TrazasService>(TrazasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
