import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllNotesComponent } from './display-all-notes.component';

describe('DisplayAllNotesComponent', () => {
  let component: DisplayAllNotesComponent;
  let fixture: ComponentFixture<DisplayAllNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayAllNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAllNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
