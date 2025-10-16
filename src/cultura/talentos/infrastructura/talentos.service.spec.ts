import { Test, TestingModule } from '@nestjs/testing';
import { Talento_Artistico_Service } from './talentos.service';

describe('TalentosService', () => {
  let service: Talento_Artistico_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Talento_Artistico_Service],
    }).compile();

    service = module.get<Talento_Artistico_Service>(Talento_Artistico_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
