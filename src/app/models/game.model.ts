import { User } from './user.model';

export class Game {
  id?: string;
  room_id?: string;
  creator_id?: string;
  updated_at?: string;
  playing?: string;
  normal_word?: string;
  wolf_word?: string;
  game_wolves_attributes?: { wolf_id: string }[];
  wolves?: User[];
}

export class Word {
  word: string;
}
