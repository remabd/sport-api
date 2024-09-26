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

describe('Remove a rank', () => {
    let removeRank: RemoveRank;
    let rankRepository: Repository<Rank>;

    const mockRankRepository = {
        findOneBy: jest.fn(),
        remove: jest.fn(),
    };
    const mockRankService = {};
    const mockFindARank = {};
    const mockCreateRank = {};
    const mockFindAllRanks = {};
    const mockUpdateRank = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                RemoveRank,
                {
                    provide: 'RANK_REPOSITORY',
                    useValue: mockRankRepository,
                },
                { provide: FindARank, useValue: mockFindARank },
                { provide: CreateRank, useValue: mockCreateRank },
                { provide: FindAllRanks, useValue: mockFindAllRanks },
                { provide: UpdateRank, useValue: mockUpdateRank },
            ],
        }).compile();

        removeRank = moduleRef.get<RemoveRank>(RemoveRank);
        rankRepository = moduleRef.get('RANK_REPOSITORY');
    });

    afterEach(async () => {
        jest.resetAllMocks();
    });

    it('Should remove a rank', async () => {
        const oldRank = {
            id: '1234-5678-9012-3456',
            name: 'Beginner',
            position: 1,
            sport: '2222-3333-4444-5555',
        };
        mockRankRepository.findOneBy.mockResolvedValue(oldRank);
        mockRankRepository.remove.mockResolvedValue(oldRank);

        const result = await removeRank.execute(oldRank.id);
        expect(result).toEqual(oldRank);
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            id: oldRank.id,
        });
        expect(mockRankRepository.remove).toHaveBeenCalledWith(oldRank);
    });

    it('Should fail to remove a rank', async () => {
        mockRankRepository.findOneBy.mockResolvedValue(null);

        await expect(removeRank.execute('999')).rejects.toThrow(
            'Rank not found',
        );
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            id: '999',
        });
    });
});
