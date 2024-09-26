import { Test } from '@nestjs/testing';
import { RankController } from '../../rank.controller';
import { CreateRank } from '../rank.create';
import { FindAllRanks } from '../rank.findAll';
import { FindARank } from '../rank.findOne';
import { RemoveRank } from '../rank.remove';
import { UpdateRank } from '../rank.update';
import { Repository } from 'typeorm';
import { Rank } from 'src/rank/entitites/rank.entity';

jest.mock('uuid', () => ({
    v4: jest.fn(() => '1234-5678-9012-3456'),
}));

describe('Find all ranks', () => {
    let findAllRanks: FindAllRanks;
    let rankRepository: Repository<Rank>;

    const mockRankRepository = {
        find: jest.fn(),
    };
    const mockRankService = {};
    const mockFindARank = {};
    const mockCreateRank = {};
    const mockUpdateRank = {};
    const mockRemoveRank = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                FindAllRanks,
                {
                    provide: 'RANK_REPOSITORY',
                    useValue: mockRankRepository,
                },
                { provide: FindARank, useValue: mockFindARank },
                { provide: CreateRank, useValue: mockCreateRank },
                { provide: UpdateRank, useValue: mockUpdateRank },
                { provide: RemoveRank, useValue: mockRemoveRank },
            ],
        }).compile();

        findAllRanks = moduleRef.get<FindAllRanks>(FindAllRanks);
        rankRepository = moduleRef.get('RANK_REPOSITORY');
    });

    afterEach(async () => {
        jest.resetAllMocks();
    });

    it('Should find all ranks', async () => {
        const ranks = [
            {
                id: '1234-5678-9012-3456',
                name: 'Beginner',
                position: 1,
                sportId: '2222-3333-4444-5555',
            },
            {
                id: '2345-6789-0123-4567',
                name: 'Intermediate',
                position: 2,
                sportId: '2222-3333-4444-5555',
            },
        ];
        mockRankRepository.find.mockResolvedValue(ranks);

        const result = await findAllRanks.execute();
        expect(result).toEqual(ranks);
        expect(mockRankRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Should return empty if no ranks', async () => {
        const ranks = [];
        mockRankRepository.find.mockResolvedValue(ranks);

        const result = await findAllRanks.execute();
        expect(result).toEqual(ranks);
        expect(mockRankRepository.find).toHaveBeenCalledTimes(1);
    });
});
