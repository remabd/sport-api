import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CreateCustomer {
  constructor(
    @Inject('RANK_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async execute(email: string, password: string) {
    const newCustomer = {
      email: email,
      password: password,
    };
    return await this.customerRepository.save(newCustomer);
  }
}
