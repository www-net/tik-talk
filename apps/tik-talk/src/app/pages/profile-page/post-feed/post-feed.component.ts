import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  WritableSignal,
} from '@angular/core';
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
  public readonly hostElement = inject(ElementRef);
  public readonly r2 = inject(Renderer2);
  public readonly feed: WritableSignal<Post[]> = this.postService.posts;

  @HostListener('window:resize')
  public onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resizeFeed();
    }, 1000);
  }

  private resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
