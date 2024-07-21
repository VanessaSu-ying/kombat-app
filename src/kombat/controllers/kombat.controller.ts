import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InputKombatDto } from '../dto/kombat/input/input-kombat.dto';
import { KombatService } from '../services/kombat.service';

@Controller('kombat')
export class KombatController {
  constructor(private readonly kombatService: KombatService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() inputKombat: InputKombatDto) {
    try {
      return this.kombatService.initKombat(inputKombat);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
