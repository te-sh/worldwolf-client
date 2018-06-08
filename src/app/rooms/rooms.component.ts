import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

import { Room } from '../models/room.model';
import { RoomResource } from '../resources/room.resource';
import { EnterRoomComponent } from './enter-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private roomResource: RoomResource
  ) { }

  ngOnInit() {
    this.roomResource.list()
      .subscribe((rooms) => this.rooms = rooms);
  }

  enter(room: Room) {
    const dialogRef = this.dialog.open(EnterRoomComponent, { data: { room } });
    dialogRef.afterClosed()
      .pipe(filter(_.identity))
      .subscribe(() => this.router.navigate(['room', room.id]));
  }

}
