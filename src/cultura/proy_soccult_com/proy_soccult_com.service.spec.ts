import { Test, TestingModule } from '@nestjs/testing';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';

describe('ProySoccultComService', () => {
  let service: Proyecto_Sociocultural_Comunitario_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Proyecto_Sociocultural_Comunitario_Service],
    }).compile();

    service = module.get<Proyecto_Sociocultural_Comunitario_Service>(Proyecto_Sociocultural_Comunitario_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
