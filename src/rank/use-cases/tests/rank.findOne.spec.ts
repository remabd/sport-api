import { Test } from '@nestjs/testing';
import { Rank } from 'src/rank/entitites/rank.entity';
import { RankController } from '../../rank.controller';
import { Repository } from 'typeorm';
import { CreateRank } from '../rank.create';
import { FindAllRanks } from '../rank.findAll';
import { FindARank } from '../rank.findOne';
import { RemoveRank } from '../rank.remove';
import { UpdateRank } from '../rank.update';

jest.mock('uuid', () => ({
    v4: jest.fn(() => '1234-5678-9012-3456'),
}));

describe('Find one rank', () => {
    let findARank: FindARank;
    let rankRepository: Repository<Rank>;

    const mockRankRepository = {
        findOneBy: jest.fn(),
    };
    const mockRankService = {};
    const mockFindAllRank = {};
    const mockCreateRank = {};
    const mockUpdateRank = {};
    const mockRemoveRank = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                FindARank,
                {
                    provide: 'RANK_REPOSITORY',
                    useValue: mockRankRepository,
                },
                { provide: FindAllRanks, useValue: mockFindAllRank },
                { provide: CreateRank, useValue: mockCreateRank },
                { provide: UpdateRank, useValue: mockUpdateRank },
                { provide: RemoveRank, useValue: mockRemoveRank },
            ],
        }).compile();

        findARank = moduleRef.get<FindARank>(FindARank);
        rankRepository = moduleRef.get('RANK_REPOSITORY');
    });

    afterEach(async () => {
        jest.resetAllMocks();
    });

    it('Should find a rank', async () => {
        const rank = {
            id: '1234-5678-9012-3456',
            name: 'Beginner',
            position: 1,
            sportId: '2222-3333-4444-5555',
        };
        mockRankRepository.findOneBy.mockResolvedValue(rank);

        const result = await findARank.execute(rank.id);
        expect(result).toEqual(rank);
        expect(mockRankRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('Should return empty if no rank', async () => {
        mockRankRepository.findOneBy.mockResolvedValue(null);

        await expect(findARank.execute('999')).rejects.toThrow(
            'Rank not found',
        );
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            id: '999',
        });
    });
});
