import { Inject, Injectable } from '@nestjs/common';
import { CreateChargeDto } from '../domain/dto/create-charge.dto';
import { UpdateChargeDto } from '../domain/dto/update-charge.dto';
import { ChargeRepository } from '../domain/repository/charge.repository';
import { MongooseChargeRepository } from '../infrastructure/mongoose-charge.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { Charge_Entity } from '../domain/entities/charge.entity';
import { SearchChargeDto } from '../domain/dto/search-charge.dto';
import { validatePagination } from 'src/modules/common/extractors';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class ChargeService {
  constructor(
    @Inject(MongooseChargeRepository)
    private repository: ChargeRepository,
  ) {}

  create(createChargeDto: CreateChargeDto,traza:TrazasService): Promise<Charge_Entity|string> {
    return this.repository.create(createChargeDto, traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Charge_Entity>|string> {
   
    return this.repository.findAll(validatePagination (page,1), validatePagination(pageSize,15));
  }

  findOne(id: string): Promise<Charge_Entity|string> {
    return this.repository.findOne(id);
  }

  update(updateChargeDto: UpdateChargeDto,traza:TrazasService): Promise<Charge_Entity|string> {
    return this.repository.update(updateChargeDto,traza);
  }

  remove(id: string,traza:TrazasService): Promise<Charge_Entity|string> {
    return this.repository.remove(id, traza);
  }
  search(query: SearchChargeDto): Promise<Charge_Entity[]> {
    return this.repository.search(query);
  }
}
