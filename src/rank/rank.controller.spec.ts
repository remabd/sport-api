import { Test, TestingModule } from '@nestjs/testing';
import { RankController } from './rank.controller';
import { FindAllRanks } from './use-cases/rank.findAll';
import { FindARank } from './use-cases/rank.findOne';
import { RemoveRank } from './use-cases/rank.remove';
import { UpdateRank } from './use-cases/rank.update';
import { CreateRank } from './use-cases/rank.create';

describe('RankController', () => {
    let controller: RankController;

    const mock = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                { provide: CreateRank, useValue: mock },
                { provide: FindARank, useValue: mock },
                { provide: FindAllRanks, useValue: mock },
                { provide: UpdateRank, useValue: mock },
                { provide: RemoveRank, useValue: mock },
            ],
        }).compile();

        controller = module.get<RankController>(RankController);
    });

    it('Should be defined', async () => {
        expect(await controller).toBeDefined();
    });
});
