import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class FindCustomer {
  constructor(
    @Inject('RANK_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async execute(id: string) {
    return await this.customerRepository.findOneBy({ id: id });
  }
}
