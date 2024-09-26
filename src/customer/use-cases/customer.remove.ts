import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class RemoveCustomer {
    constructor(
        @Inject('RANK_REPOSITORY')
        private customerRepository: Repository<Customer>,
    ) {}

    async execute(id: string) {
        const CustomerToRemove = await this.customerRepository.findOneBy({
            id: id,
        });
        return await this.customerRepository.remove(CustomerToRemove);
    }
}
