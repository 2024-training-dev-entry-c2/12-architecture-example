import { TestBed } from '@angular/core/testing';

import { CreateClientsService } from './create-clients.service';

describe('CreateClientsService', () => {
  let service: CreateClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
