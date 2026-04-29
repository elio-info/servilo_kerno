import { DataList } from 'src/modules/common/data-list';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonAuth } from 'src/modules/auth/domain/person-auth.entity';
import { SearchQuery } from 'src/modules/search/domain/dto/query.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { RemovePersonDto } from '../dto/remove-person.dto';

export interface PersonRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Person>>;
  create: (person: CreatePersonDto, tkhds:TrazasService) => Promise<Person|string>;
  findOne: (id: string) => Promise<Person>;
  update: (person: UpdatePersonDto, trz:TrazasService) => Promise<Person|string>;
  remove: (id: RemovePersonDto, thk:TrazasService) => Promise<Person|string>;
  byUserName: (username: string) => Promise<PersonAuth>;
  search: (query) => Promise<Person[]>;
}
