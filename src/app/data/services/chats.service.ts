import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';
import { ProfileService } from './profile.service';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly me: WritableSignal<Profile | null> = inject(ProfileService).me;

  // TODO - вынести baseApiUrl - в отдельный файл
  private readonly baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  private readonly chatsUrl: string = `${this.baseApiUrl}chat/`;
  private readonly messageUrl: string = `${this.baseApiUrl}message/`;

  public readonly activeChatMessages = signal<Message[]>([]);

  public createChat(userId: number): Observable<Chat> {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  public getMyChats(): Observable<LastMessageRes[]> {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  public getChatById(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages: Message[] = chat.messages.map((message: Message) => {
          return {
            ...message,
            user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion: chat.userFirst.id === this.me()?.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages,
        };
      }),
    );
  }

  public sendMessage(chatId: number, message: string): Observable<Message> {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
