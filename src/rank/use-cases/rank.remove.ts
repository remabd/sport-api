import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';
import { NotFoundException } from '../exceptions/notFound.exception';

@Injectable()
export class RemoveRank {
    constructor(
        @Inject('RANK_REPOSITORY')
        private rankRepository: Repository<Rank>,
    ) {}

    async execute(id: string) {
        const rankToRemove = await this.rankRepository.findOneBy({ id: id });
        if (!rankToRemove) {
            throw new NotFoundException();
        }
        return await this.rankRepository.remove(rankToRemove);
    }
}
