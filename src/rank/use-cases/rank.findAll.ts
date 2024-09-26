import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { v4 } from 'uuid';

@Injectable()
export class FindAllRanks {
    constructor(
        @Inject('RANK_REPOSITORY')
        private rankRepository: Repository<Rank>,
    ) {}

    async execute() {
        return await this.rankRepository.find();
    }
}
