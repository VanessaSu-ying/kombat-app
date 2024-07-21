import { Player } from '../dto/player/player.dto';

export interface KombatInterface {
  selectFirstPlayerOrder(player1, player2): Player[];
  startFight(player1, plaver2): string[];
}
