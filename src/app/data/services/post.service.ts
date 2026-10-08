import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PostComment, CommentCreateDto, Post, PostCreateDto } from '../interfaces/post.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly #http: HttpClient = inject(HttpClient);
  // TODO
  readonly #baseApiUrl: string = environment.BASE_API_URL;

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

  public createComment(payload: CommentCreateDto): Observable<PostComment> {
    return this.#http.post<PostComment>(`${this.#baseApiUrl}comment/`, payload);
  }

  public getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this.#http.get<Post>(`${this.#baseApiUrl}post/${postId}`).pipe(
      map((res) => {
        return res.comments;
      }),
    );
  }
}
