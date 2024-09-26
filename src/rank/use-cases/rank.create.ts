import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';
import { RankDto } from '../dto/rank.dto';
import { ConflictException } from '../exceptions/conflict.exception';
import { SportDto } from 'src/sport/dto/sport.dto';

@Injectable()
export class CreateRank {
    constructor(
        @Inject('RANK_REPOSITORY')
        private rankRepository: Repository<Rank>,
    ) {}

    async execute(rank: { name: string; position: number; sport: SportDto }) {
        const isExisting = await this.rankRepository.findOneBy({
            sport: rank.sport,
            name: rank.name,
        });
        if (isExisting) {
            throw new ConflictException('Rank already exist');
        }
        const position = await this.rankRepository.findOneBy({
            sport: rank.sport,
            position: rank.position,
        });
        if (position) {
            throw new ConflictException('Position is not valid');
        }
        const newRank = {
            id: v4(),
            ...rank,
        };
        return await this.rankRepository.save(newRank);
    }
}
