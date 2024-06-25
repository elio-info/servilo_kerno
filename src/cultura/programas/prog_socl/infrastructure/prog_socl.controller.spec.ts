import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaSocial_Controller } from './prog_socl.controller';
import { ProgramaSocial_Service } from './prog_socl.service';

describe('ProgramaSocialController', () => {
  let controller: ProgramaSocial_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaSocial_Controller],
      providers: [ProgramaSocial_Service],
    }).compile();

    controller = module.get<ProgramaSocial_Controller>(ProgramaSocial_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
