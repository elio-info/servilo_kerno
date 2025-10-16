import { Test, TestingModule } from '@nestjs/testing';
import { Comunidad_Transformacion_Controller } from './comun_transf.controller';
import { Comunidad_Transformacion_Service } from './comun_transf.service';

describe('Comunidad_TransformacionController', () => {
  let controller: Comunidad_Transformacion_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Comunidad_Transformacion_Controller],
      providers: [Comunidad_Transformacion_Service],
    }).compile();

    controller = module.get<Comunidad_Transformacion_Controller>(Comunidad_Transformacion_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
