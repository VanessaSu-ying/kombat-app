import { Injectable, Logger } from '@nestjs/common';
import { KombatInterface } from '../interfaces/kombat.interface';
import { Player } from '../dto/player/player.dto';
import { ResultAttack } from '../interfaces/result-attack.interface';
import { commonMoves } from '../const/moves/common-moves.conts';
import KombatUseCaseError from '../errors/kombat-use-case.error';

@Injectable()
export class KombatUseCase implements KombatInterface {
  private readonly logger = new Logger(KombatUseCase.name);
  selectFirstPlayerOrder(player1: Player, player2: Player): Player[] {
    try {
      const player1Moves = player1.moves.length;
      const player1Hits = player1.hits.length;

      const player2Moves = player2.moves.length;
      const player2Hits = player2.hits.length;

      player1.totalMovesCombinations = player1Moves + player1Hits;
      player2.totalMovesCombinations = player2Moves + player2Hits;

      if (
        player1.totalMovesCombinations > player2.totalMovesCombinations ||
        player1Moves > player2Moves ||
        player1Hits > player2Hits
      ) {
        return [player2, player1];
      }

      return [player1, player2];
    } catch (error) {
      this.logger.error(error);
      throw new KombatUseCaseError(KombatUseCase.name, error);
    }
  }

  startFight(firstPlayer: Player, secondPlayer: Player): string[] {
    try {
      let round = 0;
      const fightResult: string[] = [];
      const maxRound = Math.max(
        firstPlayer.totalMovesCombinations,
        secondPlayer.totalMovesCombinations,
      );

      while (round <= maxRound) {
        const resultAttack1: ResultAttack = this.attackOpponent(
          firstPlayer,
          secondPlayer,
          round,
        );
        fightResult.push(...resultAttack1.attacks);
        if (!resultAttack1.isSecondPlayerAlive) break;

        const resultAttack2: ResultAttack = this.attackOpponent(
          secondPlayer,
          firstPlayer,
          round,
        );

        fightResult.push(...resultAttack2.attacks);
        if (!resultAttack2.isSecondPlayerAlive) break;
        round++;
      }
      return fightResult;
    } catch (error) {
      this.logger.error(error);
      throw new KombatUseCaseError(KombatUseCase.name, error);
    }
  }

  private attackOpponent(
    firstPlayer: Player,
    secoundPlayer: Player,
    round: number,
  ): ResultAttack {
    const attacks: string[] = [];
    const movePlayer1 = firstPlayer.moves[round] || '';
    const hitPlayer1 = firstPlayer.hits[round] || '';
    const fullMove = movePlayer1 + hitPlayer1;

    const isSpecialMove = firstPlayer.specialMoves[fullMove];
    const isMoveAndHit = movePlayer1 && hitPlayer1 && !isSpecialMove;
    const isOnlyMove = movePlayer1 && !hitPlayer1 && !isSpecialMove;
    const isOnlyHits = !movePlayer1 && hitPlayer1 && !isSpecialMove;

    if (isSpecialMove) {
      const { damage, moveDescription } = firstPlayer.specialMoves[fullMove];
      attacks.push(`${firstPlayer.name} ${moveDescription}`);
      secoundPlayer.energy -= damage;
    }
    if (isMoveAndHit) {
      attacks.push(
        `${firstPlayer.name} se mueve y ${commonMoves[hitPlayer1]?.moveDescription}`,
      );
      secoundPlayer.energy -= commonMoves[hitPlayer1]?.damage || 0;
    }
    if (isOnlyMove) attacks.push(`${firstPlayer.name} se mueve`);
    if (isOnlyHits) {
      attacks.push(
        `${firstPlayer.name} ${commonMoves[hitPlayer1]?.moveDescription}`,
      );
      secoundPlayer.energy -= commonMoves[hitPlayer1]?.damage || 0;
    }

    const isSecondPlayerAlive: boolean =
      this.isSecondPlayerAlive(secoundPlayer);

    if (!isSecondPlayerAlive) {
      this.finishFight(firstPlayer, attacks);
    }
    return {
      attacks,
      isSecondPlayerAlive,
      secondPlayerEnergy: secoundPlayer.energy,
    };
  }

  private finishFight(firstPlayer: Player, attacks: string[]): void {
    attacks.push(
      `${firstPlayer.name} ha ganado la pelea y aun le queda ${firstPlayer.energy} de energia`,
    );
  }
  private isSecondPlayerAlive = (secoundPlayer: Player): boolean => {
    return secoundPlayer.energy > 0;
  };
}
