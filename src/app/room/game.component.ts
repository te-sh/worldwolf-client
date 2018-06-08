import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { GameResource } from '../resources/game.resource';
import { WordComponent } from './word.component';
import { VoteComponent } from './vote.component';
import { GameContentComponent  } from './game-content.component';
import { VoteStatusComponent } from './vote-status.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() room: Room;
  @Input() user: User;

  constructor(
    private dialog: MatDialog,
    private gameResource: GameResource
  ) { }

  ngOnInit() {
  }

  word() {
    this.dialog.open(WordComponent, { data: { room: this.room } });
  }

  vote() {
    this.dialog.open(VoteComponent, { data: { room: this.room, user: this.user } });
  }

  gameContent() {
    this.dialog.open(GameContentComponent, { data: { room: this.room } });
  }

  voteStatus() {
    this.dialog.open(VoteStatusComponent, { data: { room: this.room, user: this.user } });
  }

  finishGame() {
    this.gameResource.delete(this.room.game)
      .subscribe(_.noop);
  }

}
