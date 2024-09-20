import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { DatabaseModule } from 'src/database/database.module';
import { sportProviders } from './sport.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SportController],
  providers: [SportService, ...sportProviders],
})
export class SportModule {}
