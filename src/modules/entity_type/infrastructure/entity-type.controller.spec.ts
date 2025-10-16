import { Test, TestingModule } from '@nestjs/testing';
import { EntityTypeController } from './entity-type.controller';
import { EntityTypeService } from '../application/entity-type.service';
import { getModelToken } from '@nestjs/mongoose';
import { EntityTypeModel } from './entity-type.schema';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';

describe('EntityTypeController', () => {
  let controller: EntityTypeController;
  let service: EntityTypeService;
  function mockEntityTypeModel(dto: CreateEntityTypeDto) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityTypeController],
      providers: [
        EntityTypeService,
        {
          provide: getModelToken(EntityTypeModel.name),
          useValue: mockEntityTypeModel({ name: 'jum', hierarchy: 0 }),
        },
      ],
    }).compile();

    service = module.get<EntityTypeService>(EntityTypeService);
    controller = module.get<EntityTypeController>(EntityTypeController);
  });

  it('The Entity Type controller is defined', () => {
    expect(controller).toBeDefined();
  });

  it('The entity Type Service is defined', () => {
    expect(service).toBeDefined();
  });
});
