import { Test, TestingModule } from '@nestjs/testing';
import { CategorieController } from './categorie.controller';
import { CategorieService } from '../application/categorie.service';
import { getModelToken } from '@nestjs/mongoose';
import { CategorieModel } from './categorie.schema';
import mongoose from 'mongoose';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';

describe('CategorieController', () => {
  let controller: CategorieController;
  let service: CategorieService;
  function mockCategorieModel(dto: CreateCategorieDto) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorieController],
      providers: [
        CategorieService,
        {
          provide: getModelToken(CategorieModel.name),
          useValue: mockCategorieModel({ name: 'ray' }),
        },
      ],
    }).compile();

    service = module.get<CategorieService>(CategorieService);
    controller = module.get<CategorieController>(CategorieController);
  });

  it('The Categorie controller is defined', () => {
    expect(controller).toBeDefined();
  });

  it('The Categorie Service is defined', () => {
    expect(service).toBeDefined();
  });
});
