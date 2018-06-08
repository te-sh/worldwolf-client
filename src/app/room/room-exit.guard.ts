import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { RoomComponent } from './room.component';

@Injectable()
export class RoomExitGuard implements CanDeactivate<RoomComponent> {

  canDeactivate(
    component: RoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return true;
  }

}
