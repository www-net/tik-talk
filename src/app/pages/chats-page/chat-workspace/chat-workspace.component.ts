import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';
import { ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../../data/services/chats.service';
import { Observable, switchMap, switchMapTo } from 'rxjs';
import { Chat } from '../../../data/interfaces/chats.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    MessageInputComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly chatsService: ChatsService = inject(ChatsService);

  public readonly activeChat$: Observable<Chat> = this.route.params.pipe(
    switchMap(({ id }) => {
      return this.chatsService.getChatById(id);
    }),
  );
}
