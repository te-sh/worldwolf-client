import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';

const url = environment.api.http;

@Injectable()
export class GameResource {

  constructor(private http: HttpClient) { }

  create(game: Game) {
    const param = _.pick(game, ['room_id', 'creator_id']);
    return this.http.post(`${url}/games`, param)
      .pipe(map((game) => game as Game));
  }    

  update(game: Game) {
    const param = _.pick(game, ['normal_word', 'wolf_word', 'game_wolves_attributes']);
    return this.http.patch(`${url}/games/${game.id}`, param)
      .pipe(map((game) => game as Game));
  }

  delete(game: Game) {
    return this.http.delete(`${url}/games/${game.id}`)
      .pipe(map((game) => game as Game));
  }

}