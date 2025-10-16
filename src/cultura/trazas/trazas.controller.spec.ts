import { Test, TestingModule } from '@nestjs/testing';
import { TrazasController } from './trazas.controller';
import { TrazasService } from './trazas.service';

describe('TrazasController', () => {
  let controller: TrazasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrazasController],
      providers: [TrazasService],
    }).compile();

    controller = module.get<TrazasController>(TrazasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
