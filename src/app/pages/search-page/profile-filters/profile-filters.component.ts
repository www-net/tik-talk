import {Component, inject} from '@angular/core';
import {AvatarUploadComponent} from '../../settings-page/avatar-upload/avatar-upload.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../../data/services/profile.service';
import {debounceTime, switchAll, switchMap} from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  imports: [
    AvatarUploadComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  standalone: true,
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {
  fb: FormBuilder = inject(FormBuilder)
  profileService: ProfileService = inject(ProfileService)

  searchForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        })
      )
      .subscribe()
  }
}
















