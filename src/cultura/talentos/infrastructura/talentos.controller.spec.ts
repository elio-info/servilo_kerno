import { Test, TestingModule } from '@nestjs/testing';
import { Talento_Artistico_Controller } from './talentos.controller';

describe('TalentosController', () => {
  let controller: Talento_Artistico_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Talento_Artistico_Controller],
    }).compile();

    controller = module.get<Talento_Artistico_Controller>(Talento_Artistico_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
