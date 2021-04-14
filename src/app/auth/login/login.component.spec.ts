import { not } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Token } from '../token';

import { LoginComponent } from './login.component';

@Component({selector: 'app-about', template: ''})
class AboutStubComponent {}

describe('LoginComponent', async () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['authenticate', 'login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ AboutStubComponent, LoginComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        FormsModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const hostElement = fixture.nativeElement;
    const emailInput: HTMLInputElement = hostElement.querySelector('input[name="email"]');
    const passwordInput: HTMLInputElement = hostElement.querySelector('input[name="password"]');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const token = new Token();

    token.access = 'access_token';
    token.refresh = 'refresh_token';
    authSpy.authenticate.and.returnValue(of(token));
    authSpy.login.and.returnValue(true);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    emailInput.value = 'test@opentimesheet.io';
    passwordInput.value = 'password';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.authenticate).toHaveBeenCalledWith(component.credentials);
    expect(authSpy.login).toHaveBeenCalledWith(token);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should not authenticate if one of email or password isn\'t set', () => {
    const hostElement = fixture.nativeElement;
    const emailInput: HTMLInputElement = hostElement.querySelector('input[name="email"]');
    const passwordInput: HTMLInputElement = hostElement.querySelector('input[name="password"]');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    emailInput.value = 'test@opentimesheet.io';
    passwordInput.value = '';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.authenticate).not.toHaveBeenCalled();
  });

  it('should not login in case of error while authenticating', () => {
    const hostElement = fixture.nativeElement;
    const emailInput: HTMLInputElement = hostElement.querySelector('input[name="email"]');
    const passwordInput: HTMLInputElement = hostElement.querySelector('input[name="password"]');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    authSpy.authenticate.and.returnValue(throwError({message: 'Invalid credentials'}));

    emailInput.value = 'test@opentimesheet.io';
    passwordInput.value = 'password';

    emailInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.authenticate).toHaveBeenCalledWith(component.credentials);
    expect(authSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
