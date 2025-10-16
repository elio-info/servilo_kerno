import { Test, TestingModule } from '@nestjs/testing';
import { Control_ActividadCultural_Service } from './control_actcult.service';

describe('ControlActcultService', () => {
  let service: Control_ActividadCultural_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Control_ActividadCultural_Service],
    }).compile();

    service = module.get<Control_ActividadCultural_Service>(Control_ActividadCultural_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
