import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { DatabaseModule } from 'src/database/database.module';
import { rankProviders } from './rank.providers';
import { CreateRank } from './use-cases/rank.create';
import { FindARank } from './use-cases/rank.findOne';
import { FindAllRanks } from './use-cases/rank.findAll';
import { UpdateRank } from './use-cases/rank.update';
import { RemoveRank } from './use-cases/rank.remove';

@Module({
    imports: [DatabaseModule],
    controllers: [RankController],
    providers: [
        CreateRank,
        FindARank,
        FindAllRanks,
        UpdateRank,
        RemoveRank,
        ...rankProviders,
    ],
})
export class RankModule {}
