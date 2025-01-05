import {Component, inject, WritableSignal} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom, Observable} from 'rxjs';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
  ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService:ProfileService = inject(ProfileService);
  subscribers$: Observable<Profile[]> = this.profileService.getSubscribersShortList()

  me: WritableSignal<Profile | null> = this.profileService.me

  menuItems = [
    {
      label: 'Moя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
