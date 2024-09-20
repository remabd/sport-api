import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RankService } from './rank.service';
import { Sport } from 'src/sport/entities/sport.entity';
import { CreateRank } from './use-cases/rank.create';
import { FindARank } from './use-cases/rank.findOne';
import { FindAllRanks } from './use-cases/rank.findAll';
import { UpdateRank } from './use-cases/rank.update';
import { RemoveRank } from './use-cases/rank.remove';

@Controller('rank')
export class RankController {
  constructor(
    private readonly rankService: RankService,
    private readonly createRank: CreateRank,
    private readonly findARank: FindARank,
    private readonly findAllRanks: FindAllRanks,
    private readonly updateRank: UpdateRank,
    private readonly removeRank: RemoveRank,
  ) {}

  @Post()
  create(@Body() body: { name: string; position: number; sport: Sport }) {
    return this.createRank.execute(body.name, body.position, body.sport);
  }

  @Get()
  findAll() {
    return this.findAllRanks.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findARank.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string; position: number },
  ) {
    return this.updateRank.execute(id, body.name, body.position);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeRank.execute(id);
  }
}
