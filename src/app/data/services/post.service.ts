import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Post, PostCreateDto } from '../interfaces/post.interface';
import { Profile } from '../interfaces/profile.interface';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly #http: HttpClient = inject(HttpClient);
  readonly #baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  public readonly posts: WritableSignal<Post[]> = signal<Post[]>([]);

  public createPost(payload: PostCreateDto): Observable<Post[]> {
    return this.#http.post<Post>(`${this.#baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      }),
    );
  }

  public fetchPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${this.#baseApiUrl}post/`).pipe(
      tap((res: Post[]) => {
        this.posts.set(res);
      }),
    );
  }
}
