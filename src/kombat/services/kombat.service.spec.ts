import { Test, TestingModule } from '@nestjs/testing';
import { KombatService } from './kombat.service';
import { InputKombatDto } from '../dto/kombat/input/input-kombat.dto';
import { inputBody } from '../../../test/e2e.fixture';
import { OutputKombatDto } from '../dto/kombat/output/output-kombat.dto';
import { KombatUseCase } from '../use-cases/kombat.use-case';
import { Logger } from '@nestjs/common';

describe('KombatService', () => {
  let service: KombatService;
  let kombatUseCase: KombatUseCase;
  const mockInput: InputKombatDto = inputBody;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KombatService, KombatUseCase, Logger],
    }).compile();

    service = module.get<KombatService>(KombatService);
    kombatUseCase = module.get<KombatUseCase>(KombatUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return OutputKombatDto with player winner', () => {
    const result: OutputKombatDto = service.initKombat(mockInput);
    expect(result.statusCode).toBe(200);
    expect(result.data.length).toBe(7);
    expect(result.data[6]).toContain('Arnaldor');
  });

  it('Call kombatUseCase service and receive a exception', async () => {
    jest
      .spyOn(kombatUseCase, 'selectFirstPlayerOrder')
      .mockImplementation(() => {
        throw new Error('Unexpected error, check server');
      });

    try {
      await service.initKombat(undefined);
    } catch (error) {
      expect(error.message).toBe(
        "Cannot destructure property 'player1' of 'inputKombatDto' as it is undefined.",
      );
    }
  });
});
