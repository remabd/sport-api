import { DataSource } from 'typeorm';
import { Rank } from './entitites/rank.entity';

export const rankProviders = [
  {
    provide: 'RANK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rank),
    inject: ['DATA_SOURCE'],
  },
];
