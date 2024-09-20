import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';
import { SportDto } from './dto/sport.dto';
import { v4 } from 'uuid';

@Injectable()
export class SportService {
  constructor(
    @Inject('SPORT_REPOSITORY')
    private sportRepository: Repository<Sport>,
  ) {}

  async create(name: string) {
    const newSport: SportDto = {
      id: v4(),
      name: name,
    };
    return await this.sportRepository.save(newSport);
  }

  async findAll(): Promise<Sport[]> {
    return await this.sportRepository.find();
  }

  async findOne(id: string): Promise<Sport> {
    return await this.sportRepository.findOneBy({ id: id });
  }

  async update(id: string, name: string) {
    const sportToUpdate = await this.sportRepository.findOneBy({ id: id });
    sportToUpdate.name = name;
    return await this.sportRepository.save(sportToUpdate);
  }

  async remove(id: string) {
    const sportToDelete = await this.sportRepository.findOneBy({ id: id });
    return await this.sportRepository.remove(sportToDelete);
  }
}
