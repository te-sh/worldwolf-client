import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Room } from '../models/room.model';
import { UserResource } from '../resources/user.resource';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.scss']
})
export class EnterRoomComponent implements OnInit {

  room: Room;
  name: string;
  pass: string;
  error = false;

  constructor(
    private dialogRef: MatDialogRef<EnterRoomComponent>,
    private userResource: UserResource,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.room = this.data.room;
  }

  enter() {
    this.userResource.create(this.room.id, this.name, this.pass)
      .subscribe(
        (user) => this.dialogRef.close(user),
        (err) => this.error = true
      );
  }

  dismiss() {
    this.dialogRef.close();
  }

}
