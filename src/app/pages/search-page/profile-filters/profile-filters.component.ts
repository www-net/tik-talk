import {Component, inject, OnDestroy} from '@angular/core';
import {AvatarUploadComponent} from '../../settings-page/avatar-upload/avatar-upload.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../../data/services/profile.service';
import {debounceTime, startWith, Subscription, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
export class ProfileFiltersComponent  implements OnDestroy{
  fb: FormBuilder = inject(FormBuilder)
  profileService: ProfileService = inject(ProfileService)

  searchForm: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  searchFormSub!: Subscription

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        // takeUntilDestroyed() // новое решение отписки c ng v16
      )
      .subscribe()
  }

  // один из старых способов отписки
  ngOnDestroy() {
    this.searchFormSub.unsubscribe()
  }
}
















