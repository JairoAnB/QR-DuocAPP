import { TestBed } from '@angular/core/testing';

import { ServiceAlertServiceService } from './service-alert-service.service';

describe('ServiceAlertServiceService', () => {
  let service: ServiceAlertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAlertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
