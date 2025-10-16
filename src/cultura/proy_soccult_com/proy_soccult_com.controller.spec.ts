import { Test, TestingModule } from '@nestjs/testing';
import { Proyecto_Sociocultural_Comunitario_Controller } from './proy_soccult_com.controller';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';

describe('ProySoccultComController', () => {
  let controller: Proyecto_Sociocultural_Comunitario_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Proyecto_Sociocultural_Comunitario_Controller],
      providers: [Proyecto_Sociocultural_Comunitario_Service],
    }).compile();

    controller = module.get<Proyecto_Sociocultural_Comunitario_Controller>(Proyecto_Sociocultural_Comunitario_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
