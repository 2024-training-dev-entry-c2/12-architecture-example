import { TestBed } from '@angular/core/testing';

import { DeleteClientsService } from './delete-clients.service';

describe('DeleteClientsService', () => {
  let service: DeleteClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
