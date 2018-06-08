import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { RoomExitGuard } from './room/room-exit.guard';

const routes: Routes = [
  { path: '', component: RoomsComponent },
  { path: 'room/:id', component: RoomComponent, canDeactivate: [RoomExitGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
