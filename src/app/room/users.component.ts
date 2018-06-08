import { Component, OnInit, Input } from '@angular/core';
import { concatMap, filter } from 'rxjs/operators';
import * as _ from 'lodash';

import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import { UserResource } from '../resources/user.resource';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users: User[];
  @Input() game: Game;

  constructor(
    private userResource: UserResource,
    private dialogService: DialogService
  ) { }

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

  ban(user: User) {
    if (this.game && user.active) {
      return;
    }

    this.dialogService.confirm(`${user.name} を退室させます。よろしいですか？`)
      .pipe(
        filter(_.identity),
        concatMap(() => this.userResource.delete(user))
      )
      .subscribe(_.noop);
  }

}
