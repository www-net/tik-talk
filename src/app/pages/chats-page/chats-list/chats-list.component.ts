import { Component } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtnComponent],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {}
