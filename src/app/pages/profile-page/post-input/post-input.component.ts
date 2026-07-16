import { Component, inject, WritableSignal } from '@angular/core';
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component';
import { ProfileService } from '../../../data/services/profile.service';
import { Profile } from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-post-input',
  imports: [AvatarCircleComponent],
  templateUrl: './post-input.component.html',
  standalone: true,
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  public readonly profile: WritableSignal<Profile | null> =
    inject(ProfileService).me;
}
