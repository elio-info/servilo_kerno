import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { ErrorMapperService } from './error-mapper.service';
import { NotFoundError } from '../../app/shared/infrastructure/repository/errors/not-found.error';
import { DuplicatedEntityError } from '../../app/shared/infrastructure/repository/errors/duplicated-entity.error';
import { FilterFormatError } from '../../app/shared/infrastructure/repository/errors/filter-format.error';
import { ObjectIdError } from '../../app/shared/infrastructure/repository/errors/object-id.error';

import { Error } from 'mongoose';

describe('ErrorMapperService', () => {
  let service: ErrorMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorMapperService],
    }).compile();

    service = module.get<ErrorMapperService>(ErrorMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('map', () => {
    it('should be defined', () => {
      expect(service.map).toBeDefined();
    });

    it('should return the same value when no error', () => {
      const error = null;
      expect(service.map(error)).toBe(error);
    });

    it('should return the same value when error has no constructor', () => {
      const error: any = {};
      error.constructor = null;
      expect(service.map(error)).toBe(error);
    });

    it('should return the same value when no mapper defined', () => {
      const error: any = {};
      expect(service.map(error)).toBe(error);
    });

    it('should return NotFoundException mapped error', () => {
      const error: any = new NotFoundError();
      expect(service.map(error)).toBeInstanceOf(NotFoundException);
    });

    it('should return DuplicatedEntityError mapped error', () => {
      const error: any = new DuplicatedEntityError();
      expect(service.map(error)).toBeInstanceOf(BadRequestException);
    });

    it('should return ValidationError mapped error', () => {
      const error: any = new Error.ValidationError('');
      expect(service.map(error)).toBeInstanceOf(BadRequestException);
    });

    it('should return FilterFormatError mapped error', () => {
      const error: any = new FilterFormatError();
      expect(service.map(error)).toBeInstanceOf(BadRequestException);
    });

    it('should return ObjectIdError mapped error', () => {
      const error: any = new ObjectIdError();
      expect(service.map(error)).toBeInstanceOf(BadRequestException);
    });
  });
});
