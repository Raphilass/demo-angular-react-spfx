import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayPanelComponent } from './add-holiday-panel.component';

describe('AddHolidayPanelComponent', () => {
  let component: AddHolidayPanelComponent;
  let fixture: ComponentFixture<AddHolidayPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHolidayPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHolidayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
