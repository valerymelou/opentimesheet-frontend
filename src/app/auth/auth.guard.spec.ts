import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let guard: AuthGuard;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const authMock = jasmine.createSpyObj('AuthService', ['isFullyAuthenticated']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: AuthService,
          useValue: authMock
        }
      ]
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(AuthGuard);
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should return true for login page', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {
      url: '/opentimesheet/login'
    } as RouterStateSnapshot;

    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('canActivate should return true if fully authenticated', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {
      url: '/opentimesheet/time-track/fill'
    } as RouterStateSnapshot;
    authSpy.isFullyAuthenticated.and.returnValue(true);

    expect(guard.canActivate(route, state)).toBe(true);
  });

  it('canActivate should return false if not fully authenticated', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {
      url: '/opentimesheet/time-track/fill'
    } as RouterStateSnapshot;
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    authSpy.isFullyAuthenticated.and.returnValue(false);

    expect(guard.canActivate(route, state)).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/opentimesheet/login']);
  });
});
