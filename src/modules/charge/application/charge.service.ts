import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto } from '../domain/dto/create-charge.dto';
import { UpdateChargeDto } from '../domain/dto/update-charge.dto';
import { ChargeRepository } from '../domain/repository/charge.repository';
import { MongooseChargeRepository } from '../infrastructure/mongoose-charge.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { Charge_Entity } from '../domain/entities/charge.entity';
import { SearchChargeDto } from '../domain/dto/search-charge.dto';

@Injectable()
export class ChargeService {
  constructor(
    @Inject(MongooseChargeRepository)
    private repository: ChargeRepository,
  ) {}

  create(createChargeDto: CreateChargeDto): Promise<void> {
    return this.repository.create(createChargeDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Charge_Entity>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Charge_Entity> {
    return this.repository.findOne(id);
  }

  update(id: string, updateChargeDto: UpdateChargeDto): Promise<Charge_Entity> {
    return this.repository.update(id, updateChargeDto);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }
  search(query: SearchChargeDto): Promise<Charge_Entity[]> {
    return this.repository.search(query);
  }
}
