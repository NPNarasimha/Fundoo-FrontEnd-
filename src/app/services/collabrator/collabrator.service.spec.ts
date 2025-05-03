import { TestBed } from '@angular/core/testing';

import { CollabratorService } from './collabrator.service';

describe('CollabratorService', () => {
  let service: CollabratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollabratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
