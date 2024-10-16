import { TestBed } from '@angular/core/testing';

import { DevolverInicioService } from './devolver-inicio.service';

describe('DevolverInicioService', () => {
  let service: DevolverInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevolverInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
