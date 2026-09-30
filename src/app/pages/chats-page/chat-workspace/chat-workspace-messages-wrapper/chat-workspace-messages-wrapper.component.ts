import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import { Chat, Message } from '../../../../data/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  private readonly chatsService: ChatsService = inject(ChatsService);

  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  public readonly messages: WritableSignal<Message[]> = this.chatsService.activeChatMessages;

  public async onSendMessage(messageText: string): Promise<void> {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText));
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
