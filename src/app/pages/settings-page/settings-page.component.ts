import {
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { catchError, concatMap, firstValueFrom, Observable, of } from 'rxjs';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  standalone: true,
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent) avatarUpLoader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: [``, Validators.required],
    lastName: [``, Validators.required],
    username: [{ value: ``, disabled: true }, Validators.required],
    description: [``],
    stack: [``],
  });

  isSaving: WritableSignal<boolean> = signal(false);
  saveError: WritableSignal<string | null> = signal<string | null>(null);

  constructor() {
    effect(() => {
      const me = this.profileService.me();
      console.log(`EFFECT this.profileService.me(): `, me);

      if (!me) {
        return;
      }

      this.form.patchValue({
        ...me,
        stack: this.mergeStack(me.stack),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.isSaving.set(true);
    this.saveError.set(null);

    const avatar$: Observable<void | Profile | undefined> = this.avatarUpLoader
      .avatar
      ? this.profileService.uploadAvatar(this.avatarUpLoader.avatar!)
      : of(undefined);

    avatar$
      .pipe(
        concatMap(() => {
          const raw = this.form.value;

          // Нормализация: превращаем null → undefined
          const normalized: Partial<Profile> = {
            firstName: raw.firstName ?? undefined,
            lastName: raw.lastName ?? undefined,
            username: raw.username ?? undefined,
            description: raw.description ?? undefined,
            stack: this.splitStack(raw.stack),
          };
          return this.profileService.patchProfile(normalized);
        }),
        catchError((err) => {
          console.error(err);
          this.saveError.set('Не удалось сохранить профиль');
          return of(null);
        }),
      )
      .subscribe(() => {
        this.isSaving.set(false);
        console.log('Изменения профиля сохранены');
      });
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(`,`);
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(`,`);

    return stack;
  }
}
