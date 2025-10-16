import { Inject, Injectable } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongooseBankAccountRepository } from '../infrastructure/mongoose-bank-account.repository';
import { BankAccountRepository } from '../domain/repository/bank-account.repository';
import { CreateBankAccountDto } from '../domain/dto/create-bank-account.dto';
import { BankAccount } from '../domain/entities/bank-account.entity';
import { UpdateBankAccountDto } from '../domain/dto/update-bank-account.dto';
import { SearchBankAccountDto } from '../domain/dto/search-bank-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @Inject(MongooseBankAccountRepository)
    private bankAccountRepository: BankAccountRepository,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto): Promise<void> {
    return this.bankAccountRepository.create(createBankAccountDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<BankAccount>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.bankAccountRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<BankAccount> {
    return this.bankAccountRepository.findOne(id);
  }

  async update(
    id: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    return this.bankAccountRepository.update(id, updateBankAccountDto);
  }

  remove(id: string): Promise<void> {
    return this.bankAccountRepository.remove(id);
  }
  search(query: SearchBankAccountDto): Promise<BankAccount[]> {
    return this.bankAccountRepository.search(query);
  }
}
