import { TestBed } from '@angular/core/testing';

import { WindparkService } from './windpark.service';

describe('WindparkService', () => {
  let service: WindparkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindparkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
