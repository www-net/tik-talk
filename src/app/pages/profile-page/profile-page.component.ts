import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable, switchMap} from 'rxjs';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgIconComponent,
    RouterLink,
    NgForOf,
    SubscriberCardComponent,
    JsonPipe,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  standalone: true,
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  subscribers$: Observable<Profile[]> = this.profileService.getSubscribersShortList(5)

  me$ = toObservable(this.profileService.me)

  profile$ = this.route.params
    .pipe(
      switchMap( ({id} ) => {
        if (id === 'me') return this.me$

        return this.profileService.getAccount(id)
      })
    )

}
