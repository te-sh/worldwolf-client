import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { UserResource } from '../resources/user.resource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users: User[];
  @Input() game: Game;

  constructor(private userResource: UserResource) { }

  ngOnInit() {
  }

  activate(user: User) {
    if (this.game) {
      return;
    }

    user.active = !user.active;
    this.userResource.update(user)
      .subscribe(_.noop);
  }

}
