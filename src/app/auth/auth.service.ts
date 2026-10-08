import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);
  // TODO - убрать апи
  // baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get(`token`);
      this.refreshToken = this.cookieService.get(`refreshToken`);
    }

    return !!this.token;
  }

  login(payload: { username: string; password: string }): Observable<TokenResponse> {
    const fd = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    // TODO - Костыль. Так как сервер лёг
    /////////////
    // return of({
    //   access_token: 'access_token',
    //   refresh_token: 'refresh_token',
    // }).pipe(tap((val) => this.saveTokens(val)));
    ////////////
    // TODO. Это временно заменил на принудительный вход
    return this.http
      .post<TokenResponse>(`${environment.AUTH_API_URL}token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${environment.AUTH_API_URL}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((res) => this.saveTokens(res)),
        catchError((err) => {
          this.logout();
          return throwError(err);
        }),
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate([`/login`]);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set(`token`, this.token);
    this.cookieService.set(`refreshToken`, this.refreshToken);
  }
}
