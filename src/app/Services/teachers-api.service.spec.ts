import { TestBed } from '@angular/core/testing';

import { TeachersApiService } from './teachers-api.service';

describe('TeachersApiService', () => {
  let service: TeachersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
