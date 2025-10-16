import { Test, TestingModule } from '@nestjs/testing';
import {Comunidad_Transformacion_Service } from './comun_transf.service';

describe('ProySoccultComService', () => {
  let service: Comunidad_Transformacion_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Comunidad_Transformacion_Service],
    }).compile();

    service = module.get<Comunidad_Transformacion_Service>(Comunidad_Transformacion_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
