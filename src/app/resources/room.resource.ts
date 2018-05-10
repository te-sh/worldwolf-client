import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';

const url = environment.api.http;

@Injectable()
export class RoomResource {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${url}/rooms`)
      .pipe(map((res) => res as Room[]));
  }

  get(roomId: string) {
    return this.http.get(`${url}/rooms/${roomId}`)
      .pipe(map((res) => res as Room));
  }

}
