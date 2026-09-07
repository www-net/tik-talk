import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private readonly http: HttpClient = inject(HttpClient);

  // TODO - вынести baseApiUrl - в отдельный файл
  private readonly baseApiUrl: string = 'https://icherniakov.ru/yt-course/';
  private readonly chatsUrl: string = `${this.baseApiUrl}chat/`;
  private readonly messageUrl: string = `${this.baseApiUrl}message/`;

  public createChat(userId: number): Observable<Chat> {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  public getMyChats(): Observable<LastMessageRes[]> {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  public getChatById(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`);
  }

  public sendMessage(chatId: number, message: string): Observable<Message> {
    return this.http.post<Message>(
      `${this.messageUrl}${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
