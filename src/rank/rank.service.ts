import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from './entitites/rank.entity';

@Injectable()
export class RankService {
  constructor(
    @Inject('RANK_REPOSITORY')
    private rankRepository: Repository<Rank>,
  ) {}
}
