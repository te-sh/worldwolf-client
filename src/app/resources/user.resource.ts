import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { TokenService } from '../services/token.service';

const url = environment.api.http;

@Injectable()
export class UserResource {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getMine() {
    return this.http.get(`${url}/users/mine`)
      .pipe(map((res) => res as User));
  }

  deleteMine() {
    return this.http.delete(`${url}/users/mine`)
      .pipe(
        map((res) => res as User),
        tap((res) => this.tokenService.reset)
      );
  }

  create(roomId: string, name: string, pass: string) {
    const param = { room_id: roomId, name, pass };
    return this.http.post(`${url}/users`, param)
      .pipe(
        map((res) => res as User),
        tap((res) => this.tokenService.set(res.token))
      );
  }

  update(user: User) {
    const param = _.pick(user, ['active']);
    return this.http.patch(`${url}/users/${user.id}`, param)
      .pipe(map((res) => res as User));
  }

}
