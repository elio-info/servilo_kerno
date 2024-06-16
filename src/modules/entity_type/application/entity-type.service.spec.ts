import { Test, TestingModule } from '@nestjs/testing';
import { EntityTypeModel } from '../infrastructure/entity-type.schema';
import { EntityTypeService } from './entity-type.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';

describe('EntityTypeService', () => {
  function mockEntityTypeModel(dto: CreateEntityTypeDto) {
    const data = dto;
    this.save = () => {
      return data;
    };
  }
  let service: EntityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntityTypeService,
        {
          provide: getModelToken(EntityTypeModel.name),
          useValue: new mockEntityTypeModel({ name: 'Disco', hierarchy: 0 }),
        },
      ],
    }).compile();

    service = module.get<EntityTypeService>(EntityTypeService);
  });

  describe('Instancia de servicio', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
