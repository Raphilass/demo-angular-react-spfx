import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSampleWebPartComponent } from './angular-sample-web-part.component';

describe('AngularSampleWebPartComponent', () => {
  let component: AngularSampleWebPartComponent;
  let fixture: ComponentFixture<AngularSampleWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularSampleWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSampleWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
