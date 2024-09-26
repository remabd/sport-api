import { Test, TestingModule } from '@nestjs/testing';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';

describe('SportService', () => {
    let service: SportService;
    let controller: SportController;

    const mockSportRepository = {
        findOneBy: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SportController],
            providers: [
                SportService,
                {
                    provide: 'SPORT_REPOSITORY',
                    useValue: mockSportRepository,
                },
            ],
        }).compile();

        service = module.get<SportService>(SportService);
        controller = module.get<SportController>(SportController);
    });

    describe('Scenario : is well defined', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
    });
});
