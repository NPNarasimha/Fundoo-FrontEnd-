import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindernotesComponent } from './remindernotes.component';

describe('RemindernotesComponent', () => {
  let component: RemindernotesComponent;
  let fixture: ComponentFixture<RemindernotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemindernotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemindernotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
