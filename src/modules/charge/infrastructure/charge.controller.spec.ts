import { Test, TestingModule } from '@nestjs/testing';
import { ChargeController } from './charge.controller';
import { ChargeService } from '../application/charge.service';
import { DataList } from 'src/modules/common/data-list';
import { Charge } from '../domain/entities/charge.entity';
import { getModelToken, Schema } from '@nestjs/mongoose';
import { ChargeModel } from './charge.schema';
import mongoose from 'mongoose';

describe('ChargeController', () => {
  let controller: ChargeController;
  const chargeMoke: ChargeModel = {
    _id: new mongoose.Types.ObjectId(),
    name: 'ray',
    updatedAt: new Date(),
    createdAt: new Date(),
    isDeleted: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChargeController],
      providers: [
        ChargeService,
        { provide: getModelToken(ChargeModel.name), useValue: chargeMoke },
      ],
    }).compile();

    controller = module.get<ChargeController>(ChargeController);
  });

  it('El controlador no esta definido', () => {
    expect(controller).toBeDefined();
  });
});
