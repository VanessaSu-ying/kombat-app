import { ArrayNotEmpty, IsArray, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerActions {
  @ApiProperty({
    type: 'array',
    maxLength: 5,
    description: 'List of moves send by players',
    example: ['SDSDK', 'DSD', 'SA', 'DSD'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(5, { each: true })
  movimientos: string[];

  @ApiProperty({
    type: 'array',
    maxLength: 1,
    description: 'List of hits send by players',
    example: ['P', '', 'K', 'P'],
  })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @MaxLength(1, { each: true })
  golpes: string[];
}
