import { Test, TestingModule } from '@nestjs/testing';
import { KombatUseCase } from '../use-cases/kombat.use-case';
import { Logger } from '@nestjs/common';
import { Player } from '../dto/player/player.dto';

describe('KombatUseCase', () => {
  let service: KombatUseCase;
  const mockPlayer1: Player = {
    moves: ['D', 'DSD', 'S', 'DSD', 'SD'],
    hits: ['K', 'P', '', 'K', 'P'],
    energy: 6,
    totalMovesCombinations: 0,
    name: 'Tony',
    specialMoves: {
      DSDP: {
        damage: 3,
        name: 'Taladoken',
        moveDescription: 'usa un Taladoken',
      },
      SDK: {
        damage: 2,
        name: 'Remuyuken',
        moveDescription: 'conecta con un Remuyuken',
      },
    },
  };

  const mockPlayer2: Player = {
    moves: ['SA', 'SA', 'SA', 'ASA', 'SA'],
    hits: ['K', '', 'K', 'P', 'P'],
    energy: 6,
    totalMovesCombinations: 0,
    name: 'Arnaldor',
    specialMoves: {
      SAK: {
        damage: 3,
        name: 'Remuyuken',
        moveDescription: 'conecta con un Remuyuken',
      },
      ASAP: {
        damage: 2,
        name: 'Taladoken',
        moveDescription: 'usa un Taladoken',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KombatUseCase, Logger],
    }).compile();

    service = module.get<KombatUseCase>(KombatUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array with firstPlayer order based on less moves combinations', () => {
    const playerOrdered: Player[] = service.selectFirstPlayerOrder(
      mockPlayer1,
      mockPlayer2,
    );
    expect(playerOrdered[0].name).toBe('Tony');
    expect(playerOrdered[1].name).toBe('Arnaldor');
    expect(playerOrdered[0].totalMovesCombinations).toEqual(10);
    expect(playerOrdered[1].totalMovesCombinations).toEqual(10);
  });

  it('should return result of kombat in array format', () => {
    mockPlayer1.totalMovesCombinations = 10;
    mockPlayer2.totalMovesCombinations = 10;
    const mockOrderedPlayers: Player[] = [mockPlayer1, mockPlayer2];
    const result = service.startFight(
      mockOrderedPlayers[0],
      mockOrderedPlayers[1],
    );
    const expectedResult = [
      'Tony se mueve y lanza una patada',
      'Arnaldor conecta con un Remuyuken',
      'Tony usa un Taladoken',
      'Arnaldor se mueve',
      'Tony se mueve',
      'Arnaldor conecta con un Remuyuken',
      'Arnaldor ha ganado la pelea y aun le queda 2 de energia',
    ];
    expect(result).toBe(expectedResult);
  });
});
