import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post, PostCreateDto } from '../interfaces/post.interface';
import { Profile } from '../interfaces/profile.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly #http: HttpClient = inject(HttpClient);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course/';

  createPost(payload: PostCreateDto): Observable<Post> {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload);
  }
}
