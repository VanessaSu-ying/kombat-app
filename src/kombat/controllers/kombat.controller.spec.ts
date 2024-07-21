import { Test, TestingModule } from '@nestjs/testing';
import { KombatController } from './kombat.controller';
import { KombatService } from '../services/kombat.service';
import { inputBody } from '../../../test/e2e.fixture';
import { KombatUseCase } from '../use-cases/kombat.use-case';

describe('KombatController', () => {
  let controller: KombatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KombatController],
      providers: [KombatService, KombatUseCase],
    }).compile();

    controller = module.get<KombatController>(KombatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should response with kombat result and statusCode 200', () => {
    const response = controller.create(inputBody);
    expect(response.statusCode).toBe(200);
    expect(response.data).toBeDefined();
  });
});
