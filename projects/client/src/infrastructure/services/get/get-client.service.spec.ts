import { TestBed } from '@angular/core/testing';

import { GetClientService } from './get-client.service';

describe('GetClientService', () => {
  let service: GetClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
