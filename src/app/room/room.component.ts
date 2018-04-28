import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { concatMap, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { RoomResource } from '../resources/room.resource';
import { UserResource } from '../resources/user.resource';
import { GameResource } from '../resources/game.resource';
import { CableService } from '../cable.service';
import { SetGameComponent } from './set-game.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  room: Room;
  user: User;
  roomStatus: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private roomResource: RoomResource,
    private userResource: UserResource,
    private gameResource: GameResource,
    private cableService: CableService
  ) { }

  ngOnInit() {
    this.loadUser();
    this.cableService.room$
      .subscribe((room) => this.setRoom(room));
  }

  ngOnDestroy() {
    this.cableService.disconnect();
  }

  private loadUser() {
    this.userResource.getMine()
      .subscribe(
        (user) => {
          this.user = user;
          this.cableService.connect(user);
          this.loadRoom();
        },
        () => this.router.navigate(['/'])
      );
  }

  private loadRoom() {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        concatMap((room_id) => this.roomResource.get(room_id))
      )
      .subscribe((room) => this.setRoom(room));
  }

  private setRoom(room: Room) {
    this.room = room;
    this.user.active = this.room.users.find((user) => user.id == this.user.id).active;

    if (!room.game) {
      this.roomStatus = 'idle';
    } else if (!room.game.playing) {
      this.roomStatus = 'set-game';
    } else {
      this.roomStatus = 'play-game';
    }
  }

  setGame() {
    this.dialog.open(SetGameComponent, { data: { room: this.room, user: this.user } });
  }

  vote() {
  }

  finishGame() {
    this.gameResource.delete(this.room.game)
      .subscribe(_.noop);
  }

  exit() {
    this.userResource.deleteMine()
      .subscribe(() => this.router.navigate(['/']));
  }

}
