import { TestBed } from '@angular/core/testing';

import { VariableSaludoService } from './variable-saludo.service';

describe('VariableSaludoService', () => {
  let service: VariableSaludoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableSaludoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
