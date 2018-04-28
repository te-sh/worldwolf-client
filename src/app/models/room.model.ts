import { User } from './user.model';
import { Game } from './game.model';

export class Room {
  id?: string;
  name?: string;
  users_count?: number;
  users?: User[];
  game?: Game;
}
