import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const url = environment.api.http;

@Injectable()
export class UserResource {

  constructor(private http: HttpClient) { }

  getMine() {
    return this.http.get(`${url}/users/mine`)
      .pipe(map((user) => user as User));
  }

  deleteMine() {
    return this.http.delete(`${url}/users/mine`)
      .pipe(map((user) => user as User));
  }

  create(room_id: string, name: string, pass: string) {
    return this.http.post(`${url}/users`, { room_id, name, pass })
      .pipe(map((user) => user as User));
  }

  update(user: User) {
    const param = _.pick(user, ['active']);
    return this.http.patch(`${url}/users/${user.id}`, param)
      .pipe(map((user) => user as User));
  }

}