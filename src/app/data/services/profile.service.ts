import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  // TODO - вынести в отдельный файл baseApiUrl
  private readonly baseApiUrl: string = environment.BASE_API_URL;

  public readonly filteredProfiles: WritableSignal<Profile[]> = signal<Profile[]>([]);

  public readonly me = signal<Profile | null>(null);

  public getTestAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  public getMe(): Observable<Profile> {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  public getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  public getSubscribersShortList(subsAmount = 3): Observable<Profile[]> {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  public patchProfile(profile: Partial<Profile>): Observable<Profile> {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  public uploadAvatar(file: File): Observable<Profile> {
    const fd = new FormData();
    fd.append(`image`, file);

    return this.http.post<Profile>(`${this.baseApiUrl}account/upload_image`, fd);
  }

  public filterProfiles(params: Record<string, any>): Observable<Pageble<Profile>> {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
