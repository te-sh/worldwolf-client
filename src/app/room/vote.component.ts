import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { Vote } from '../models/vote.model';
import { VoteResource } from '../resources/vote.resource';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  players: User[];
  vote: Vote;

  constructor(
    private dialogRef: MatDialogRef<VoteComponent>,
    private voteResource: VoteResource,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    const room = this.data.room as Room, user = this.data.user as User;

    this.players = room.users.filter((player) => player.active && player.id !== room.game.creator_id);
    this.vote = { game_id: room.game.id, voter_id: user.id };
  }

  run() {
    this.voteResource.create(this.vote)
      .subscribe((res) => this.dialogRef.close(res));
  }

  dismiss() {
    this.dialogRef.close();
  }

}
