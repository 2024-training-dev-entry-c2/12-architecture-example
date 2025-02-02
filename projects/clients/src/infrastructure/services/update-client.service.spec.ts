import { TestBed } from '@angular/core/testing';

import { UpdateClientService } from './update-client.service';

describe('UpdateClientService', () => {
  let service: UpdateClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
