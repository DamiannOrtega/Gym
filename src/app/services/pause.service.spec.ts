import { TestBed } from '@angular/core/testing';

import { PauseService } from './pause.service';

describe('PauseService', () => {
  let service: PauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PauseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
