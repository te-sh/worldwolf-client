import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSelectionList, MAT_DIALOG_DATA } from '@angular/material';
import { concatMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { GameResource } from '../resources/game.resource';

@Component({
  selector: 'app-set-game',
  templateUrl: './set-game.component.html',
  styleUrls: ['./set-game.component.scss']
})
export class SetGameComponent implements OnInit {

  game: Game = {};
  players: User[] = [];
  error = false;

  @ViewChild(MatSelectionList) wolves: MatSelectionList;

  constructor(
    private dialogRef: MatDialogRef<SetGameComponent>,
    private gameResource: GameResource,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    const room = this.data.room as Room, user = this.data.user as User;

    this.players = room.users.filter((player) => player.active && player.id !== user.id);

    if (room.game) {
      this.game = room.game;
    } else {
      const game = { room_id: room.id, creator_id: user.id };
      this.dialogRef.afterOpen()
        .pipe(concatMap(() => this.gameResource.create(game)))
        .subscribe((res) => this.game = res);
    }
  }

  random(n: number) {
    const options = this.wolves.options.toArray();
    if (n > options.length) {
      return;
    }

    const wolves = _.sampleSize(options, n);
    options.forEach((option) => option.selected = _.includes(wolves, option));
  }

  update() {
    const selected = this.wolves.selectedOptions.selected;
    this.game.game_wolves_attributes = selected.map((option) => ({ wolf_id: option.value }));
    this.gameResource.update(this.game)
      .subscribe(
        (res) => this.dialogRef.close(res),
        () => this.error = true
      );
  }

  dismiss() {
    this.gameResource.delete(this.game)
      .subscribe(() => this.dialogRef.close());
  }

}
