import { Component } from '@angular/core';
import {PostComponent} from '../post/post.component';
import {PostInputComponent} from '../post-input/post-input.component';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostComponent,
    PostInputComponent
  ],
  templateUrl: './post-feed.component.html',
  standalone: true,
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent {

}
