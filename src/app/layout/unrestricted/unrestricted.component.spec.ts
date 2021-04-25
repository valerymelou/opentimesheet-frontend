import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UnrestrictedComponent } from './unrestricted.component';

describe('UnrestrictedComponent', () => {
  let component: UnrestrictedComponent;
  let fixture: ComponentFixture<UnrestrictedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnrestrictedComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnrestrictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
