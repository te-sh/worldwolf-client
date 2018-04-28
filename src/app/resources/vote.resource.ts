import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { Vote } from '../models/vote.model';

const url = environment.api.http;

@Injectable()
export class VoteResource {

  constructor(private http: HttpClient) { }

  create(vote: Vote) {
    const param = _.pick(vote, ['voter', 'votee']);
    return this.http.post(`${url}/votes`, param)
      .pipe(map((vote) => vote as Vote));
  }

}
