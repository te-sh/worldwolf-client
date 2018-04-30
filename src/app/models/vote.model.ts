import { User } from './user.model';

export class Vote {
  id?: string;
  game_id?: string;
  voter_id?: string;
  votee_id?: string;
  voter?: User;
  votee?: User;
}
