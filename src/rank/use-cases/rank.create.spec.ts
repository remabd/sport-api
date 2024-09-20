import { Test, TestingModule } from '@nestjs/testing';
import { CreateRank } from './rank.create';
import { Repository } from 'typeorm';
import { Rank } from '../entitites/rank.entity';
import { RankController } from '../rank.controller';
import { FindARank } from './rank.findOne';
import { FindAllRanks } from './rank.findAll';
import { UpdateRank } from './rank.update';
import { RemoveRank } from './rank.remove';
import { RankService } from '../rank.service';

describe('Create Rank', () => {
  let createRank: CreateRank;
  let rankRepository: Repository<Rank>;

  const mockRankRepository = {
    create: jest.fn(),
    find: jest.fn(),
  };
  const mockRankService = {};
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
        { provide: RankService, useValue: mockRankService },
        { provide: UpdateRank, useValue: mockUpdateRank },
        { provide: RemoveRank, useValue: mockRemoveRank },
      ],
    }).compile();

    createRank = moduleRef.get<CreateRank>(CreateRank);
    rankRepository = moduleRef.get('RANK_REPOSITORY');
  });

  describe('Test', () => {
    it('should be defined', () => {
      expect(createRank).toBeDefined();
    });

    it('Should fail to add a rank', () => {});
  });
});
