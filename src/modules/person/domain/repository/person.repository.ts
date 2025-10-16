import { DataList } from 'src/modules/common/data-list';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonAuth } from 'src/modules/auth/domain/person-auth.entity';
import { SearchQuery } from 'src/modules/search/domain/dto/query.dto';

export interface PersonRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Person>>;
  create: (province: CreatePersonDto) => Promise<void>;
  findOne: (id: string) => Promise<Person>;
  update: (id: string, province: UpdatePersonDto) => Promise<Person>;
  remove: (id: string) => Promise<void>;
  byUserName: (username: string) => Promise<PersonAuth>;
  search: (query) => Promise<Person[]>;
}
