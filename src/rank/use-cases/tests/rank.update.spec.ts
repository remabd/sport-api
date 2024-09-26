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

describe('Update a rank', () => {
    let updateRank: UpdateRank;
    let rankRepository: Repository<Rank>;

    const mockRankRepository = {
        findOneBy: jest.fn(),
        save: jest.fn(),
    };
    const mockRankService = {};
    const mockFindARank = {};
    const mockCreateRank = {};
    const mockFindAllRanks = {};
    const mockRemoveRank = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                UpdateRank,
                {
                    provide: 'RANK_REPOSITORY',
                    useValue: mockRankRepository,
                },
                { provide: FindARank, useValue: mockFindARank },
                { provide: CreateRank, useValue: mockCreateRank },
                { provide: FindAllRanks, useValue: mockFindAllRanks },
                { provide: RemoveRank, useValue: mockRemoveRank },
            ],
        }).compile();

        updateRank = moduleRef.get<UpdateRank>(UpdateRank);
        rankRepository = moduleRef.get('RANK_REPOSITORY');
    });

    afterEach(async () => {
        jest.resetAllMocks();
    });

    it('Should update a rank', async () => {
        const kendo = {
            id: '2222-3333-4444-5555',
            name: 'Kendo',
        };
        const oldRank = {
            id: '1234-5678-9012-3456',
            name: 'Beginner',
            position: 1,
            sport: kendo,
        };
        const newRankDto = {
            name: 'intermediate',
            position: 2,
            sport: kendo,
        };
        mockRankRepository.findOneBy.mockResolvedValue(oldRank);
        mockRankRepository.save.mockResolvedValue({
            id: oldRank.id,
            ...newRankDto,
        });

        const result = await updateRank.execute(oldRank.id, newRankDto);
        expect(result).toEqual({ id: oldRank.id, ...newRankDto });
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            id: oldRank.id,
        });
        expect(mockRankRepository.save).toHaveBeenCalledWith({
            id: oldRank.id,
            ...newRankDto,
        });
    });

    it('Should fail to update a rank', async () => {
        const newRank = {
            name: 'intermediate',
            position: 2,
            sport: {
                id: '2222-3333-4444-5555',
                name: 'Kendo',
            },
        };
        mockRankRepository.findOneBy.mockResolvedValue(null);

        await expect(updateRank.execute('999', newRank)).rejects.toThrow(
            'Rank not found',
        );
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            id: '999',
        });
    });
});
