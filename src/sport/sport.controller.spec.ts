import { Test, TestingModule } from '@nestjs/testing';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';

describe('SportService', () => {
  	let service: SportService;
  	let controller: SportController;

  	beforeEach(async () => {
    	const module: TestingModule = await Test.createTestingModule({
    	  	controllers: [SportController],
    	  	providers: [SportService],
    	}).compile();

    	service = module.get<SportService>(SportService);
    	controller = module.get<SportController>(SportController);
  	});

  	describe('Scenario : is well defined', () => {
    	it('should be defined', () => {
      	expect(service).toBeDefined();
    	});
  	});

  	describe('Scenario : find all sports', () => {});
});
