import { Module } from '@nestjs/common';
import { KombatController } from './controllers/kombat.controller';
import { KombatService } from './services/kombat.service';
import { KombatUseCase } from './use-cases/kombat.use-case';

@Module({
  controllers: [KombatController],
  providers: [KombatService, KombatUseCase],
})
export class KombatModule {}
