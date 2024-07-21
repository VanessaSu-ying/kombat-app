import { Module } from '@nestjs/common';
import { KombatModule } from './kombat/kombat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), KombatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
