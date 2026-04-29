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
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { PersonModel } from '../infrastructure/person.schema';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { RemovePersonDto } from '../domain/dto/remove-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @Inject(MongoosePersonRepository)
    private personRepository: PersonRepository,
  @Inject(TrazasService) private traza:TrazasService
    ) { traza.trazaDTO.collection='Person'}

  async create(createPersonDto: CreatePersonDto, tkhds): Promise<Person|string> {
    createPersonDto.hashPassword = await hash(createPersonDto.password);
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.filter=createPersonDto;
    this.traza.trazaDTO.error='Ok';
    return this.personRepository.create(createPersonDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Person>> {
    
    return this.personRepository.findAll(validatePagination(page,1), validatePagination(pageSize,15));
  }

  findOne(id: string): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  async update( updatePersonDto: UpdatePersonDto, tkhds:string): Promise<Person|string> {
    if (updatePersonDto.password) {
      updatePersonDto.hashPassword = await hash(updatePersonDto.password);
      delete updatePersonDto['password'];
    }
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.filter=updatePersonDto;
    this.traza.trazaDTO.error='Ok';
    return this.personRepository.update(updatePersonDto, this.traza);
  }

  remove(id: RemovePersonDto, tkhds): Promise<Person|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
      this.traza.trazaDTO.operation='remove';
      this.traza.trazaDTO.filter=id;
      this.traza.trazaDTO.error='Ok';
    return this.personRepository.remove(id, this.traza);
  }

  byUserName(username: string): Promise<PersonAuth> {
    return this.personRepository.byUserName(username);
  }
  search(query: SearchPersonDto): Promise<Person[]> {
    return this.personRepository.search(query);
  }
}
