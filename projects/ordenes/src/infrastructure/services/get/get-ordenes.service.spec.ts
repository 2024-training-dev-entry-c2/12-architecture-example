import { TestBed } from '@angular/core/testing';

import { GetOrdenesService } from './get-ordenes.service';

describe('GetOrdenesService', () => {
  let service: GetOrdenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrdenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
