import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { Vote } from '../models/vote.model';
import { VoteResource } from '../resources/vote.resource';
import { CableService } from '../cable.service';

@Component({
  selector: 'app-vote-status',
  templateUrl: './vote-status.component.html',
  styleUrls: ['./vote-status.component.scss']
})
export class VoteStatusComponent implements OnInit {

  players: User[];
  game: Game;
  votes: Vote[] = [];

  constructor(
    private dialogRef: MatDialogRef<VoteStatusComponent>,
    private voteResource: VoteResource,
    private cableService: CableService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    const room = this.data.room as Room, user = this.data.user as User;

    this.game = room.game;
    this.players = room.users.filter((player) => player.active && player.id !== room.game.creator_id);
    this.voteResource.list(room.game)
      .subscribe((res) => this.votes = res);
    this.cableService.votes$
      .subscribe((res) => this.votes = res);
  }

  votee(player: User) {
    const vote = this.votes.find((v) => v.voter.id === player.id);
    return vote ? vote.votee : undefined;
  }

  disclose() {
    this.voteResource.disclose(this.game)
      .subscribe(_.noop);
  }

  dismiss() {
    this.dialogRef.close();
  }

}
