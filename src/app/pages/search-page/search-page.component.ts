import {Component, inject} from '@angular/core';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    AsyncPipe
  ],
  templateUrl: './search-page.component.html',
  standalone: true,
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles

  constructor() {

  }
}
