import { TestBed } from '@angular/core/testing';

import { RemoveClientService } from './remove-client.service';

describe('RemoveClientService', () => {
  let service: RemoveClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
