import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelabelComponent } from './createlabel.component';

describe('CreatelabelComponent', () => {
  let component: CreatelabelComponent;
  let fixture: ComponentFixture<CreatelabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatelabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatelabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
