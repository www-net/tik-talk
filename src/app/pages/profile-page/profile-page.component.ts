import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom, Observable, switchMap } from 'rxjs';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly chatsService: ChatsService = inject(ChatsService);
  private readonly me$: Observable<Profile | null> = toObservable(
    this.profileService.me,
  );

  public readonly subscribers$: Observable<Profile[]> =
    this.profileService.getSubscribersShortList(5);

  public readonly isMyPage: WritableSignal<boolean> = signal(false);

  public readonly profile$: Observable<Profile | null> = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    }),
  );

  public async sendMessage(userId: number): Promise<void> {
    firstValueFrom(this.chatsService.createChat(userId)).then((res) => {
      this.router.navigate(['/chats', res.id]);
    });
  }
}
