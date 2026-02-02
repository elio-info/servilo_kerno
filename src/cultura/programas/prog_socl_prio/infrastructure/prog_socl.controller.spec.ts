import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaSocial_Priorizado_Controller } from './prog_socl.controller';
import { ProgramaSocial_Service } from './prog_socl.service';

describe('ProgramaSocialController', () => {
  let controller: ProgramaSocial_Priorizado_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaSocial_Priorizado_Controller],
      providers: [ProgramaSocial_Service],
    }).compile();

    controller = module.get<ProgramaSocial_Priorizado_Controller>(ProgramaSocial_Priorizado_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
