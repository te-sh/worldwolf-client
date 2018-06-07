import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Room } from '../models/room.model';
import { Word } from '../models/game.model';
import { GameResource } from '../resources/game.resource';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  word: Word;

  constructor(
    private dialogRef: MatDialogRef<WordComponent>,
    private gameResource: GameResource,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    const room = this.data.room as Room;

    this.gameResource.word(room.game)
      .subscribe((res) => this.word = res);
  }

  dismiss() {
    this.dialogRef.close();
  }

}
