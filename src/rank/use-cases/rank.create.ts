import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';

@Injectable()
export class CreateRank {
  constructor(
    @Inject('RANK_REPOSITORY')
    private rankRepository: Repository<Rank>,
  ) {}

  async execute(name: string, position: number, sport: Sport) {
    const newRank = {
      id: v4(),
      name: name,
      position: position,
      sport: sport,
    };
    return await this.rankRepository.save(newRank);
  }
}
