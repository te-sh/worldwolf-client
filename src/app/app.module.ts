import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMatModule } from './app-mat.module';
import { AppInterceptor } from './app.interceptor';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { EnterRoomComponent } from './rooms/enter-room.component';
import { RoomComponent } from './room/room.component';
import { UsersComponent } from './room/users.component';
import { GameComponent } from './room/game.component';
import { ChatComponent } from './room/chat.component';
import { SetGameComponent } from './room/set-game.component';
import { WordComponent } from './room/word.component';
import { VoteComponent } from './room/vote.component';
import { GameContentComponent } from './room/game-content.component';
import { VoteStatusComponent } from './room/vote-status.component';
import { MessageDialogComponent } from './common/message-dialog.component';
import { ConfirmDialogComponent } from './common/confirm-dialog.component';
import { RoomExitGuard } from './room/room-exit.guard';
import { RoomResource } from './resources/room.resource';
import { UserResource } from './resources/user.resource';
import { GameResource } from './resources/game.resource';
import { VoteResource } from './resources/vote.resource';
import { CableService } from './services/cable.service';
import { TokenService } from './services/token.service';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    EnterRoomComponent,
    RoomComponent,
    UsersComponent,
    GameComponent,
    ChatComponent,
    SetGameComponent,
    VoteComponent,
    WordComponent,
    GameContentComponent,
    VoteStatusComponent,
    MessageDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMatModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    RoomResource,
    UserResource,
    GameResource,
    VoteResource,
    CableService,
    TokenService,
    DialogService
  ],
  entryComponents: [
    EnterRoomComponent,
    SetGameComponent,
    WordComponent,
    VoteComponent,
    GameContentComponent,
    VoteStatusComponent,
    MessageDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
