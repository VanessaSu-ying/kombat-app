import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PlayerActions } from '../../player/player-actions.dto';
import { ApiProperty } from '@nestjs/swagger';

export class InputKombatDto {
  @ApiProperty({
    type: PlayerActions,
    description: 'Moves and hits send by the players',
    example: {
      movimientos: ['SDD', 'DSD', 'SA', 'DSDJ'],
      golpes: ['K', '', 'K', 'P'],
    },
  })
  @ValidateNested()
  @Type(() => PlayerActions)
  player1: PlayerActions;

  @ApiProperty({
    type: PlayerActions,
    description: 'Moves and hits send by the players',
    example: {
      movimientos: ['SDD', 'DSD', 'SA', 'DSDJ'],
      golpes: ['K', '', 'K', 'P'],
    },
  })
  @ValidateNested()
  @Type(() => PlayerActions)
  player2: PlayerActions;
}
