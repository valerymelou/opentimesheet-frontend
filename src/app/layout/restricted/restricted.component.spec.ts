import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { RestrictedComponent } from './restricted.component';

@Component({selector: 'app-navbar', template: ''})
class NavbarStubComponent {
  @Input() isMobile = false;
}

@Component({selector: 'app-sidenav', template: ''})
class SidenavStubComponent {
  @Input() isMobile = false;
}

describe('RestrictedComponent', () => {
  let component: RestrictedComponent;
  let fixture: ComponentFixture<RestrictedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RestrictedComponent,
        NavbarStubComponent,
        SidenavStubComponent
      ],
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
