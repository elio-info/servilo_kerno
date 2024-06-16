import { Inject, Injectable } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongoosePersonRepository } from '../infrastructure/mongoose-person.repository';
import { PersonRepository } from '../domain/repository/person.repository';
import { CreatePersonDto } from '../domain/dto/create-person.dto';
import { Person } from '../domain/entities/person.entity';
import { UpdatePersonDto } from '../domain/dto/update-person.dto';
import { hashPassword as hash } from 'src/modules/common/helpers/password.hasher';
import { PersonAuth } from 'src/modules/auth/domain/person-auth.entity';
import { SearchPersonDto } from '../domain/dto/seatch-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @Inject(MongoosePersonRepository)
    private personRepository: PersonRepository,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<void> {
    createPersonDto.hashPassword = await hash(createPersonDto.password);
    return this.personRepository.create(createPersonDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Person>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.personRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    if (updatePersonDto.password) {
      updatePersonDto.hashPassword = await hash(updatePersonDto.password);
    }
    return this.personRepository.update(id, updatePersonDto);
  }

  remove(id: string): Promise<void> {
    return this.personRepository.remove(id);
  }

  byUserName(username: string): Promise<PersonAuth> {
    return this.personRepository.byUserName(username);
  }
  search(query: SearchPersonDto): Promise<Person[]> {
    return this.personRepository.search(query);
  }
}
