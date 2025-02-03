import { TestBed } from '@angular/core/testing';

import { UpdateClientsService } from './update-clients.service';

describe('UpdateClientsService', () => {
  let service: UpdateClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
