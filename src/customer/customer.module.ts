import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [CustomerController],
    providers: [...customerProviders],
})
export class CustomerModule {}
