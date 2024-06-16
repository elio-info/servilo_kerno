import { DataList } from 'src/modules/common/data-list';
import { BankAccount } from '../entities/bank-account.entity';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';

export interface BankAccountRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<BankAccount>>;
  create: (entity: CreateBankAccountDto) => Promise<void>;
  findOne: (id: string) => Promise<BankAccount>;
  update: (
    id: string,
    bankAccount: UpdateBankAccountDto,
  ) => Promise<BankAccount>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<BankAccount[]>;
}
