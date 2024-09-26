import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class FindCustomers {
    constructor(
        @Inject('RANK_REPOSITORY')
        private customerRepository: Repository<Customer>,
    ) {}

    async execute() {
        return await this.customerRepository.find();
    }
}
