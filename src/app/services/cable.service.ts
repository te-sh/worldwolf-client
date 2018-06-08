import { Subject } from 'rxjs';
import * as _ from 'lodash';
import * as ActionCable from 'actioncable';

import { environment } from '../../environments/environment';
import { Room } from '../models/room.model';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';
import { Vote } from '../models/vote.model';

const url = environment.api.websocket;

export class CableService {

  room$ = new Subject<Room>();
  chats$ = new Subject<Chat[]>();
  votes$ = new Subject<Vote[]>();

  private chats: Chat[] = [];
  private roomChannel: ActionCable.Channel;
  private userChannel: ActionCable.Channel;

  private callbacks = {
    connected: _.noop,
    disconnected: _.noop,
    received: (obj) => this.parseReceived(obj)
  };

  connect(user: User) {
    const cable = ActionCable.createConsumer(`${url}/cable?user_id=${user.id}`);

    this.roomChannel = cable.subscriptions
      .create({ channel: 'RoomChannel', user_id: user.id }, this.callbacks);
    this.userChannel = cable.subscriptions
      .create({ channel: 'UserChannel', user_id: user.id }, this.callbacks);
  }

  disconnect() {
    if (this.roomChannel) {
      this.roomChannel.unsubscribe();
    }
    if (this.userChannel) {
      this.userChannel.unsubscribe();
    }
  }

  chat(text: string) {
    this.roomChannel.perform('chat', { text });
  }

  private parseReceived(obj: any) {
    switch (obj.target) {
      case 'room':
        this.room$.next(obj.data);
        break;
      case 'chat':
        this.chats = [obj.data].concat(this.chats);
        this.chats$.next(this.chats);
        break;
      case 'votes':
        this.votes$.next(obj.data);
        break;
    }
  }

}
