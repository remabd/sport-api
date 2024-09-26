import { Test, TestingModule } from '@nestjs/testing';
import { CreateRank } from '../rank.create';
import { Repository } from 'typeorm';
import { Rank } from '../../entitites/rank.entity';
import { RankController } from '../../rank.controller';
import { FindARank } from '../rank.findOne';
import { FindAllRanks } from '../rank.findAll';
import { UpdateRank } from '../rank.update';
import { RemoveRank } from '../rank.remove';

jest.mock('uuid', () => ({
    v4: jest.fn(() => '1234-5678-9012-3456'),
}));

describe('Create a rank', () => {
    let createRank: CreateRank;
    let rankRepository: Repository<Rank>;

    const mockRankRepository = {
        save: jest.fn(),
        find: jest.fn(),
        findOneBy: jest.fn(),
    };
    const mockFindARank = {};
    const mockFindAllRanks = {};
    const mockUpdateRank = {};
    const mockRemoveRank = {};

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RankController],
            providers: [
                CreateRank,
                {
                    provide: 'RANK_REPOSITORY',
                    useValue: mockRankRepository,
                },
                { provide: FindARank, useValue: mockFindARank },
                { provide: FindAllRanks, useValue: mockFindAllRanks },
                { provide: UpdateRank, useValue: mockUpdateRank },
                { provide: RemoveRank, useValue: mockRemoveRank },
            ],
        }).compile();

        createRank = moduleRef.get<CreateRank>(CreateRank);
        rankRepository = moduleRef.get('RANK_REPOSITORY');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should add a rank', async () => {
        const sport = {
            id: '2222',
            name: 'kendo',
        };
        const rank = {
            name: 'beginner',
            position: 1,
            sport: sport,
        };
        mockRankRepository.findOneBy.mockResolvedValue(null);
        mockRankRepository.findOneBy.mockResolvedValue(null);
        mockRankRepository.save.mockResolvedValue(rank);

        const result = await createRank.execute(rank);
        expect(result).toEqual(rank);
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            sport: rank.sport,
            name: rank.name,
        });
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            sport: rank.sport,
            position: rank.position,
        });
        expect(mockRankRepository.findOneBy).toHaveBeenCalledTimes(2);
        expect(mockRankRepository.save).toHaveBeenCalledWith({
            id: '1234-5678-9012-3456',
            ...rank,
        });
    });

    it('Should fail because name is taken', async () => {
        const sport = {
            id: '2222',
            name: 'kendo',
        };
        const beginnerRank = {
            name: 'beginner',
            position: 2,
            sport: sport,
        };
        const intermediateRank = {
            name: 'beginner',
            position: 1,
            sport: sport,
        };
        mockRankRepository.findOneBy.mockResolvedValue(intermediateRank);
        // mockRankRepository.save.mockResolvedValue(null);

        await expect(createRank.execute(beginnerRank)).rejects.toThrow(
            'Rank already exist',
        );
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            sport: intermediateRank.sport,
            name: intermediateRank.name,
        });
    });

    it('Should fail because position is incorrect', async () => {
        const sport = {
            id: '2222',
            name: 'kendo',
        };
        const beginnerRank = {
            name: 'beginner',
            position: 1,
            sport: sport,
        };
        const intermediateRank = {
            name: 'intermediate',
            position: 1,
            sport: sport,
        };
        mockRankRepository.findOneBy.mockImplementation((query) => {
            if (query.name && query.sport) {
                return null;
            }
            if (query.sport && query.position) {
                return beginnerRank;
            }
            return null;
        });

        await expect(createRank.execute(intermediateRank)).rejects.toThrow(
            'Position is not valid',
        );
        expect(mockRankRepository.findOneBy).toHaveBeenCalledWith({
            sport: intermediateRank.sport,
            position: intermediateRank.position,
        });
    });
});
