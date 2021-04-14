import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '../core/storage/storage.service';

import { AuthService } from './auth.service';
import { Credentials } from './credentials';
import { Token } from './token';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let storage: StorageService;
  const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ StorageService ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(StorageService);

    storage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate', () => {
    const testData = {
      data: {
        access: 'access_token',
        refresh: 'refresh_token'
      }
    };
    const credentials = new Credentials();
    credentials.email = 'test@opentimesheet.io';
    credentials.password = 'password';

    service.authenticate(credentials).subscribe((token: Token) => {
      expect(token.access).toEqual('access_token');
      expect(token.refresh).toEqual('refresh_token');
    });

    const req = httpTestingController.expectOne('/auth/token');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('should log in with a valid access token', () => {
    const token = new Token();
    token.access = sampleToken;
    token.refresh = 'refresh_token';
    const answer = service.login(token);

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.isFullyAuthenticated()).toBeTrue();
    expect(answer).toBeTrue();
  });

  it('should log out successfully', () => {
    const token = new Token();
    token.access = sampleToken;
    token.refresh = 'refresh_token';
    service.login(token);
    service.logout(false);

    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should not log in with just the access token', () => {
    const token = new Token();
    token.access = 'access_token';
    const answer = service.login(token);

    expect(answer).toBeFalse();
  });

  it('should not log in with just the refresh token', () => {
    const token = new Token();
    token.refresh = 'refresh_token';
    const answer = service.login(token);

    expect(answer).toBeFalse();
  });

  it('should not login with invalid access token', () => {
    const token = new Token();
    token.access = 'access_token';
    token.refresh = 'refresh_token';
    const answer = service.login(token);

    expect(answer).toBeFalse();
  });
});
