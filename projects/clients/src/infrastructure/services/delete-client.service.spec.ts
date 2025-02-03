import { TestBed } from '@angular/core/testing';

import { DeleteClientService } from './delete-client.service';

describe('DeleteClientService', () => {
  let service: DeleteClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
