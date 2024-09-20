import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';

@Injectable()
export class UpdateRank {
  constructor(
    @Inject('RANK_REPOSITORY')
    private rankRepository: Repository<Rank>,
  ) {}

  async execute(id: string, name: string, position: number) {
    const rankToUpdate = await this.rankRepository.findOneBy({ id: id });
    rankToUpdate.name = name;
    rankToUpdate.position = position;
    return await this.rankRepository.save(rankToUpdate);
  }
}
