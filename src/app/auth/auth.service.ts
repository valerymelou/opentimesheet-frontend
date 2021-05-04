import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { BaseHttpService } from '../core/http/base-http.service';
import { StorageService } from '../core/storage/storage.service';
import { Credentials } from './credentials';
import { Token } from './token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {
  private url = '/auth';
  private state: any = null;
  private accessToken?: string;
  private refreshToken?: string;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    super();
  }

  authenticate(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(`${this.url}/token`, credentials.serialize()).pipe(
      map((response: any) => {
        const token = new Token();

        return token.fromData(response.data);
      }),
      catchError(this.handleError)
    );
  }

  login(token: Token): boolean {
    if (this.initSession(token.access, token.refresh)) {
      this.storage.setItem(environment.tokenKey, token.access);
      this.storage.setItem(environment.refreshTokenKey, token.access);

      return true;
    }

    return false;
  }

  logout(reload: boolean = true): void {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.state = null;
    this.storage.clear();

    if (reload) {
      window.location.reload();
    }
  }

  isAuthenticated(): boolean {
    if (this.accessToken && this.refreshToken) {
      return true;
    }

    return false;
  }

  isFullyAuthenticated(): boolean {
    if (!this.isAuthenticated() || !this.state) {
      return false;
    }

    const tokenExpiresAt = new Date(this.state.exp * 1000);
    const now = new Date();

    if (tokenExpiresAt < now) {
      return false;
    }

    return true;
  }

  initSession(accessToken?: string, refreshToken?: string): boolean {
    // Load the tokens from the storage if not provided.
    const access = accessToken || this.storage.getItem(environment.tokenKey);
    const refresh = refreshToken || this.storage.getItem(environment.refreshTokenKey);

    // We need both tokens to be available
    if (!access || !refresh) {
      return false;
    }

    // Decipher the access token to find user information.
    let state: any = {};

    try {
      state = jwtDecode(access);
    } catch (Error) {
      return false;
    }

    // If the deciphering works, set the accessToken and refreshToken props
    this.state = state;
    this.accessToken = access;
    this.refreshToken = refresh;

    return true;
  }

  getAccessToken(): string {
    if (this.accessToken) {
      return this.accessToken;
    }

    return '';
  }
}
