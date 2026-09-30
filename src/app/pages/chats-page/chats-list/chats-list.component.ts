import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { LastMessageRes } from '../../../data/interfaces/chats.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtnComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  private readonly chatsService: ChatsService = inject(ChatsService);

  public readonly filterChatsControl: FormControl<string | null> = new FormControl('');

  public readonly chats$: Observable<LastMessageRes[]> = combineLatest([
    this.chatsService.getMyChats(),
    this.filterChatsControl.valueChanges.pipe(startWith('')),
  ]).pipe(map(this.filterChatsByFullName));

  private filterChatsByFullName([chats, inputValue]: [LastMessageRes[], string | null]) {
    const query = inputValue ?? '';
    const lowerQuery = query.toLowerCase();

    return chats.filter((chat: LastMessageRes) => {
      const fullName = `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase();

      return fullName.includes(lowerQuery);
    });
  }
}
