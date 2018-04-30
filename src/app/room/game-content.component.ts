import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Room } from '../models/room.model';
import { Game } from '../models/game.model';
import { GameResource } from '../resources/game.resource';

@Component({
  selector: 'app-game-content',
  templateUrl: './game-content.component.html',
  styleUrls: ['./game-content.component.scss']
})
export class GameContentComponent implements OnInit {

  game: Game;

  constructor(
    private dialogRef: MatDialogRef<GameContentComponent>,
    private gameResource: GameResource,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    const room = this.data.room as Room;

    this.gameResource.get(room.game.id)
      .subscribe((res) => this.game = res);
  }

  dismiss() {
    this.dialogRef.close();
  }

}
