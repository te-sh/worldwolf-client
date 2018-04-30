import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { Game } from '../models/game.model';
import { Vote } from '../models/vote.model';

const url = environment.api.http;

@Injectable()
export class VoteResource {

  constructor(private http: HttpClient) { }

  list(game: Game) {
    return this.http.get(`${url}/votes`, { params: { game_id: game.id } })
      .pipe(map((votes) => votes as Vote[]));
  }

  create(vote: Vote) {
    const param = _.pick(vote, ['game_id', 'voter_id', 'votee_id']);
    return this.http.post(`${url}/votes`, param)
      .pipe(map((vote) => vote as Vote));
  }

}
