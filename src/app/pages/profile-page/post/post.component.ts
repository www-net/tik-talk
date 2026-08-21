import {
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PostComment, Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  public readonly postService: PostService = inject(PostService);
  public readonly post: InputSignal<Post | undefined> = input<Post>();
  public readonly comments: WritableSignal<PostComment[]> = signal([]);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  public async onCreated() {
    const recentComments: PostComment[] = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id),
    );
    this.comments.set(recentComments);
  }
}
