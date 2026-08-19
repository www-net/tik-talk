import { Component, inject, WritableSignal } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostService } from '../../../data/services/post.service';
import { Post } from '../../../data/interfaces/post.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  imports: [PostComponent, PostInputComponent],
  templateUrl: './post-feed.component.html',
  standalone: true,
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent {
  public readonly postService: PostService = inject(PostService);
  public readonly feed: WritableSignal<Post[]> = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }
}
