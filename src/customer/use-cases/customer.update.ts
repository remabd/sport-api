import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class UpdateCustomer {
  constructor(
    @Inject('RANK_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async execute() {}
}
