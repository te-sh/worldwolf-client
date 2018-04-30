import { Game } from './game.model';
import { Vote } from './vote.model';

export interface Chat {
  action: string;
  user?: string;
  text?: string;
  reason?: string;
  game?: Game;
  votes?: Vote[];
}
