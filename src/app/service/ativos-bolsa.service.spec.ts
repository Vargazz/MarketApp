import { TestBed } from '@angular/core/testing';

import { AtivosBolsaService } from './ativos-bolsa.service';

describe('AtivosBolsaService', () => {
  let service: AtivosBolsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivosBolsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
