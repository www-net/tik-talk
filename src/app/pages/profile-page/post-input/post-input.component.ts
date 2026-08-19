import { Component, inject, Renderer2, WritableSignal } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { ProfileService } from '../../../data/services/profile.service';
import { Profile } from '../../../data/interfaces/profile.interface';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../data/services/post.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  standalone: true,
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  public readonly r2: Renderer2 = inject(Renderer2);
  public readonly postService: PostService = inject(PostService);
  public readonly profile: WritableSignal<Profile | null> =
    inject(ProfileService).me;

  public postText = '';

  public onTextAreaInput(event: Event): void {
    const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  public onCreatePost(): void {
    if (!this.postText) {
      return;
    }

    firstValueFrom(
      this.postService.createPost({
        title: 'Новый пост',
        content: this.postText,
        authorId: this.profile()!.id,
        communityId: 0,
      }),
    ).then(() => {
      this.postText = '';
    });
  }
}
