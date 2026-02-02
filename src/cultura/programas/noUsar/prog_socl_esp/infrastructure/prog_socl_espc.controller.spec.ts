import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaSocial_Especial_Controller } from './prog_socl_espc.controller';
import { ProgramaSocial_Especial_Service } from './prog_socl_espc.service';

describe('ProgramaSocial_Espec_Controller', () => {
  let controller: ProgramaSocial_Especial_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaSocial_Especial_Controller],
      providers: [ProgramaSocial_Especial_Service],
    }).compile();

    controller = module.get<ProgramaSocial_Especial_Controller>(ProgramaSocial_Especial_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
