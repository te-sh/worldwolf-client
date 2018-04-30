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
import { GameContentComponent  } from './game-content.component';
import { VoteStatusComponent } from './vote-status.component';
import { VoteComponent } from './vote.component';

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
        (res) => {
          this.user = res;
          this.cableService.connect(this.user);
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
      .subscribe((res) => this.setRoom(res));
  }

  private setRoom(room: Room) {
    this.room = room;

    const user = this.room.users.find((user) => user.id == this.user.id);
    if (user) {
      this.user.active = user.active;
    }

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

  gameContent() {
    this.dialog.open(GameContentComponent, { data: { room: this.room } });
  }

  voteStatus() {
    this.dialog.open(VoteStatusComponent, { data: { room: this.room, user: this.user } });
  }

  vote() {
    this.dialog.open(VoteComponent, { data: { room: this.room, user: this.user } });
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
