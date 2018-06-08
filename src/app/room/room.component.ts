import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { RoomResource } from '../resources/room.resource';
import { UserResource } from '../resources/user.resource';
import { CableService } from '../services/cable.service';
import { DialogService } from '../services/dialog.service';
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
    private cableService: CableService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.loadUser();
    this.cableService.room$
      .subscribe((room) => this.setRoom(room));
  }

  ngOnDestroy() {
    this.cableService.disconnect();
  }

  loadUser() {
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

  loadRoom() {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        concatMap((roomId) => this.roomResource.get(roomId))
      )
      .subscribe((res) => this.setRoom(res));
  }

  private setRoom(room: Room) {
    this.room = room;

    const user = this.room.users.find((u) => u.id === this.user.id);
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

  exit() {
    this.router.navigate(['/']);
  }

  canExit() {
    if (this.user.active && this.room.game) {
      return this.dialogService.message('ゲーム中のため退室できません')
        .pipe(map(() => false));
    } else {
      return this.dialogService.confirm('退室します。よろしいですか？')
        .pipe(
          concatMap((res) => {
            if (res) {
              return this.userResource.deleteMine()
                .pipe(map(() => true));
            } else {
              return of(false);
            }
          })
        );
    }
  }

}
