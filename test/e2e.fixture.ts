import { InputKombatDto } from 'src/kombat/dto/kombat/input/input-kombat.dto';

export const inputBody: InputKombatDto = {
  player1: {
    movimientos: ['D', 'DSD', 'S', 'DSD', 'SD'],
    golpes: ['K', 'P', '', 'K', 'P'],
  },
  player2: {
    movimientos: ['SA', 'SA', 'SA', 'ASA', 'SA'],
    golpes: ['K', '', 'K', 'P', 'P'],
  },
};

export const outputKombatResponse = {
  statusCode: 200,
  data: [
    'Tony se mueve y lanza una patada',
    'Arnaldor conecta con un Remuyuken',
    'Tony usa un Taladoken',
    'Arnaldor se mueve',
    'Tony se mueve',
    'Arnaldor conecta con un Remuyuken',
    'Arnaldor ha ganado la pelea y aun le queda 2 de energia',
  ],
};
