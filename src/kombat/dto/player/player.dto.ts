import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PlayerName } from '../../../kombat/enums/player-names.enum';

export class Player {
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  moves: string[] = [];

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  hits: string[] = [];

  @IsOptional()
  @IsString()
  @IsEnum(PlayerName)
  name?: string;

  @IsOptional()
  @IsNumber()
  energy?: number = 6;

  @IsOptional()
  specialMoves?: {
    [key: string]: { damage: number; name: string; moveDescription: string };
  };
  @IsNumber()
  totalMovesCombinations?: number = 0;
}
