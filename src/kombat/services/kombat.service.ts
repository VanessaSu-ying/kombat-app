import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InputKombatDto } from '../dto/kombat/input/input-kombat.dto';
import { OutputKombatDto } from '../dto/kombat/output/output-kombat.dto';
import { KombatUseCase } from '../use-cases/kombat.use-case';
import {
  specialMovesPlayer1,
  specialMovesPlayer2,
} from '../const/moves/special-moves.const';
import { Player } from '../dto/player/player.dto';
import { PlayerName } from '../enums/player-names.enum';

@Injectable()
export class KombatService {
  private readonly logger = new Logger(KombatService.name);

  constructor(private kombatUseCase: KombatUseCase) {}

  initKombat(inputKombatDto: InputKombatDto): OutputKombatDto {
    try {
      const { player1, player2 } = inputKombatDto;

      const firstPlayer = new Player();
      firstPlayer.moves = player1.movimientos;
      firstPlayer.hits = player1.golpes;
      firstPlayer.name = PlayerName.Tony;
      firstPlayer.specialMoves = specialMovesPlayer1;

      const secondPlayer = new Player();
      secondPlayer.moves = player2.movimientos;
      secondPlayer.hits = player2.golpes;
      secondPlayer.name = PlayerName.Arnaldor;
      secondPlayer.specialMoves = specialMovesPlayer2;

      const playersOrdered: Player[] =
        this.kombatUseCase.selectFirstPlayerOrder(firstPlayer, secondPlayer);
      const resultKombat: string[] = this.kombatUseCase.startFight(
        playersOrdered[0],
        playersOrdered[1],
      );
      return new OutputKombatDto(resultKombat);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
