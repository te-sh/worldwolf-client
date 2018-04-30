import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Chat } from '../models/chat.model';
import { CableService } from '../cable.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  text = '';
  chats$: Observable<Chat[]>;

  constructor(private cableService: CableService) { }

  ngOnInit() {
    this.chats$ = this.cableService.chats$;
  }

  chat() {
    this.cableService.chat(this.text);
    this.text = '';
  }

}
