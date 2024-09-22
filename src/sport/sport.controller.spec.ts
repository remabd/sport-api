import { Test, TestingModule } from '@nestjs/testing';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';

jest.mock('uuid', () => ({
	v4: jest.fn(() => '1234-5678-9012-3456')
}));

describe('SportService', () => {
  	let service: SportService;
  	let controller: SportController;

	const mockSportRepository = {
		save: jest.fn(),
		find: jest.fn(),
		findOneBy: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};


  	beforeEach(async () => {
    	const module: TestingModule = await Test.createTestingModule({
    	  	controllers: [SportController],
    	  	providers: [SportService, 
				{
					provide: "SPORT_REPOSITORY",
					useValue: mockSportRepository,
				}
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

  	describe('Scenario : find all sports', () => {
		it("Should return an array of sports", async () => {
			const sports  = [{id : "1", name : "Kendo"}, {id : "2", name : "Iaido"}];
			mockSportRepository.find.mockResolvedValue(sports);

			const result = await service.findAll();
			expect(result).toEqual(sports);
			expect(mockSportRepository.find).toHaveBeenCalled();
		});

		it("Should return empty if no sports", async () => {
			const sports = [];
			mockSportRepository.find.mockResolvedValue(sports);

			const result = await service.findAll();
			expect(result).toEqual(sports);
			expect(mockSportRepository.find).toHaveBeenCalled();
		});
	});

	describe("Scenario : find One sport", () => {
		it('should throw an error if sport not found', async () => {
			mockSportRepository.findOneBy = jest.fn().mockResolvedValue(null);

			await expect(service.findOne("999")).rejects.toThrow('Sport not found');
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith({ id: "999" })
		});

		it("Should return a sport", async () => {
			const sport = {id : "1", name : "Kendo"}
			mockSportRepository.findOneBy.mockResolvedValue(sport);

			const result = await service.findOne("1");
			expect(result).toEqual({id : "1", name : "Kendo"});
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith({id : "1"});
		});
	})

	describe("Scenario : Add a sport", () => {
		it("Should add a new sport", async () => {
			const sportDto = {name : "Karate"};
			const sport = {id : "1234-5678-9012-3456", ...sportDto};
			mockSportRepository.findOneBy.mockResolvedValue(null);
			mockSportRepository.save.mockResolvedValue(sport);
			
			const result = await service.create(sportDto);
			expect(result).toEqual(sport);
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith({name : "Karate"});
			expect(mockSportRepository.save).toHaveBeenCalledWith(expect.objectContaining({
				id : "1234-5678-9012-3456",
				name : "Karate"
			}));
		})

		it("Should fail to add a new sport", async () => {
			const sportDto = {name : "Kendo"};
			const sport = {id : "1234-5678-9012-3456", ...sportDto};
			mockSportRepository.findOneBy.mockResolvedValue(sport);
			mockSportRepository.save.mockResolvedValue(null);

			await expect(service.create(sportDto)).rejects.toThrow("Sport already exist");
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith(sportDto);
		})
	})

	describe("Scenario : Update a sport", () => {
		it("Should update a sport", async () => {
			const oldSport = {id : "1234-5678-9012-3456", name: "Kendo"};
			const newName = "Iaido";
			const updatedSport = {id : "1234-5678-9012-3456", name: "Iaido"}
			mockSportRepository.findOneBy.mockResolvedValue(oldSport);
			mockSportRepository.save.mockResolvedValue(updatedSport);


			const result = await service.update(oldSport.id, newName);
			expect(result).toEqual(updatedSport);
			console.log("result :", result)
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith({id: "1234-5678-9012-3456"});
			// expect(mockSportRepository.update).toHaveBeenCalledWith(oldSport.id, expect.objectContaining({
			// 	name : "Iaido"
			// }));
			expect(mockSportRepository.save).toHaveBeenCalledWith(oldSport.id, expect.objectContaining({ name: "Iaido" }));
			expect(mockSportRepository.findOneBy).toHaveBeenCalledTimes(2);
		})

		it("Should fail to update a new sport", async () => {
			mockSportRepository.findOneBy = jest.fn().mockResolvedValue(null);

			await expect(service.findOne("999")).rejects.toThrow('Sport not found');
			expect(mockSportRepository.findOneBy).toHaveBeenCalledWith({ id: "999" })
		})
	})
});
