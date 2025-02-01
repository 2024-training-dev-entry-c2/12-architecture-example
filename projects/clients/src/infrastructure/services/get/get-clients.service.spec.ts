import { TestBed } from '@angular/core/testing';

import { GetClientsService } from './get-clients.service';

describe('GetClientsService', () => {
  let service: GetClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
