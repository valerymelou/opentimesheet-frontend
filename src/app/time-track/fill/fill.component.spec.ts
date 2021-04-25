import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillComponent } from './fill.component';

@Component({selector: 'app-title', template: ''})
class TitleStubComponent {
  @Input() title = '';
}

describe('FillComponent', () => {
  let component: FillComponent;
  let fixture: ComponentFixture<FillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillComponent, TitleStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
