import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { SportDto } from './dto/sport.dto';
import { v4 } from 'uuid';
import { NotFoundException } from './exceptions/notFound.exception';
import { ConflictException } from './exceptions/conflict.exception';

@Injectable()
export class SportService {
    constructor(
        @Inject('SPORT_REPOSITORY')
        private sportRepository: Repository<Sport>,
    ) {}

    async create(sport: { name: string }) {
        const isExisting = await this.sportRepository.findOneBy({
            name: sport.name,
        });
        if (isExisting) {
            throw new ConflictException();
        }
        const newSport = {
            id: v4(),
            ...sport,
        };
        return await this.sportRepository.save(newSport);
    }

    async findAll(): Promise<Sport[]> {
        return await this.sportRepository.find();
    }

    async findOne(id: string): Promise<Sport> {
        const sport = await this.sportRepository.findOneBy({ id: id });
        if (!sport) {
            throw new NotFoundException();
        }
        return sport;
    }

    async update(id: string, name: string) {
        const sportToUpdate = await this.sportRepository.findOneBy({ id: id });
        if (!sportToUpdate) {
            throw new NotFoundException();
        }
        const doesNameExist = await this.sportRepository.findOneBy({
            name: name,
        });
        if (doesNameExist && sportToUpdate.id !== doesNameExist.id) {
            throw new ConflictException();
        }
        sportToUpdate.name = name;
        await this.sportRepository.save(sportToUpdate);
        return { ...sportToUpdate, name: name };
    }

    async remove(id: string) {
        const sportToDelete = await this.sportRepository.findOneBy({ id: id });
        if (!sportToDelete) {
            throw new NotFoundException();
        }
        return await this.sportRepository.remove(sportToDelete);
    }
}
