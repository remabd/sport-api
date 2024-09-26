import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';
import { error } from 'console';
import { RankDto } from '../dto/rank.dto';
import { NotFoundException } from '../exceptions/notFound.exception';
import { SportDto } from 'src/sport/dto/sport.dto';

@Injectable()
export class UpdateRank {
    constructor(
        @Inject('RANK_REPOSITORY')
        private rankRepository: Repository<Rank>,
    ) {}

    async execute(
        id: string,
        rank: { name: string; position: number; sport: SportDto },
    ) {
        const rankToUpdate = await this.rankRepository.findOneBy({ id: id });
        if (!rankToUpdate) {
            throw new NotFoundException();
        }
        const updatedRank = {
            id: rankToUpdate.id,
            ...rank,
        };
        return await this.rankRepository.save(updatedRank);
    }
}
