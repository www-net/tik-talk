import { Component, input, InputSignal } from '@angular/core';
import { Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
  ],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss',
})
export class PostComponent {
  public readonly post: InputSignal<Post | undefined> = input<Post>();
}
