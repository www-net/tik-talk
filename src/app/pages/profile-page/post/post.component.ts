import { Component, input, InputSignal } from '@angular/core';
import { Post } from '../../../data/interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  standalone: true,
  styleUrl: './post.component.scss',
})
export class PostComponent {
  public readonly post: InputSignal<Post | undefined> = input<Post>();
}
