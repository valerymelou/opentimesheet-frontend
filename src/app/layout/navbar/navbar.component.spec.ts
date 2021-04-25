import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent],
      imports: [
        SharedModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    component.logout();

    expect(authSpy.logout).toHaveBeenCalled();
  });

  it('should emit collapse event', () => {
    spyOn(component.collapse, 'emit');

    const toggleButton = fixture.debugElement.query(By.css('.toggle-btn'));
    toggleButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.collapse.emit).toHaveBeenCalled();
  });
});
