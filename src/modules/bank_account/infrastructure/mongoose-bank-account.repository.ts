import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { BankAccountRepository } from '../domain/repository/bank-account.repository';
import { BankAccount } from '../domain/entities/bank-account.entity';
import { BankAccountDocument, BankAccountModel } from './bank-account.schema';
import { CreateBankAccountDto } from '../domain/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../domain/dto/update-bank-account.dto';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { extractEntity, extractMunicipality } from '../../common/extractors';
import { validateId } from 'src/modules/common/helpers/id-validator';

const POPULATE_PATH = {
  entity: {
    path: 'entity',
    populate: [
      { path: 'entityType' },
      { path: 'municipality', populate: { path: 'province' } },
      {
        path: 'place',
        populate: { path: 'municipality', populate: { path: 'province' } },
      },
    ],
  },
  municipality: { path: 'municipality', populate: { path: 'province' } },
};
const MODULE = 'Bank Account';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class MongooseBankAccountRepository implements BankAccountRepository {
  constructor(
    @InjectModel(BankAccountModel.name)
    private bankAccountModel: Model<BankAccountModel>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<DataList<BankAccount>> {
    const skipCount = (page - 1) * pageSize;

    const [banks, count] = await Promise.all([
      this.bankAccountModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(POPULATE_PATH.entity)
        .populate(POPULATE_PATH.municipality)
        .exec(),
      this.bankAccountModel.countDocuments(IS_NOT_DELETED).exec(),
    ]);
    const bankAccountsCollection = banks.map((bank) => this.toEntity(bank));

    const dataList: DataList<BankAccount> = {
      data: bankAccountsCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(bankAccount: CreateBankAccountDto): Promise<void> {
    validateId(bankAccount.entity, 'entity');
    validateId(bankAccount.municipality, 'municipality');
    try {
      await new this.bankAccountModel(bankAccount).save();
    } catch (e) {
      throw new DuplicatedValueError(e.message);
    }
  }

  async findOne(id: string): Promise<BankAccount> {
    validateId(id, MODULE);

    const bank = await this.bankAccountModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate(POPULATE_PATH.entity)
      .populate(POPULATE_PATH.municipality);
    if (!bank) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(bank);
  }

  async update(
    id: string,
    bankAccount: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    bankAccount.entity ? validateId(bankAccount.entity, 'entity') : null;

    bankAccount.municipality
      ? validateId(bankAccount.municipality, 'municipality')
      : null;

    const document = await this.bankAccountModel
      .findOneAndUpdate({ _id: id, ...IS_NOT_DELETED }, bankAccount, {
        new: true,
        populate: { path: 'municipality', populate: { path: 'province' } },
      })
      .populate(POPULATE_PATH.entity)
      .populate(POPULATE_PATH.municipality);

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(document);
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.bankAccountModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }
  }

  async search(query) {
    const banks = await this.bankAccountModel
      .find(query)
      .populate(POPULATE_PATH.entity)
      .populate(POPULATE_PATH.municipality);
    const banksCollection = banks.map((bank) => this.toEntity(bank));
    return banksCollection;
  }

  private toEntity(bankAccount: BankAccountDocument): BankAccount {
    return {
      id: bankAccount._id.toString(),
      entity: extractEntity(bankAccount.entity),
      isCard: bankAccount.isCard,
      accountType: bankAccount.accountType,
      account: bankAccount.account,
      titular: bankAccount.titular,
      bank: bankAccount.bank,
      agency: bankAccount.agency,
      subsidiary: bankAccount.subsidiary,
      address: bankAccount.address,
      municipality: extractMunicipality(bankAccount.municipality),
      updatedAt: bankAccount.updatedAt,
      createdAt: bankAccount.createdAt,
    };
  }
}
