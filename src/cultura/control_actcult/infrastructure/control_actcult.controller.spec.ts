import { Test, TestingModule } from '@nestjs/testing';
import { ControlActcultController } from '../control_actcult.controller';
import { ControlActcultService } from '../control_actcult.service';

describe('ControlActcultController', () => {
  let controller: ControlActcultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlActcultController],
      providers: [ControlActcultService],
    }).compile();

    controller = module.get<ControlActcultController>(ControlActcultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
