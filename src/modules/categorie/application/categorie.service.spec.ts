import { Test, TestingModule } from '@nestjs/testing';
import { CategorieModel } from '../infrastructure/categorie.schema';
import { CategorieService } from './categorie.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';

describe('CategorieService', () => {
  function mockCategorieModel(dto: CreateCategorieDto) {
    const data = dto;
    this.save = () => {
      return data;
    };
  }
  let service: CategorieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategorieService,
        {
          provide: getModelToken(CategorieModel.name),
          useValue: new mockCategorieModel({ name: 'Disco' }),
        },
      ],
    }).compile();

    service = module.get<CategorieService>(CategorieService);
  });

  describe('Instancia de servicio', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
