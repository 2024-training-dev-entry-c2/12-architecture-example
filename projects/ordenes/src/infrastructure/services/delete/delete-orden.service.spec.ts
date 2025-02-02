import { TestBed } from '@angular/core/testing';

import { DeleteOrdenService } from './delete-orden.service';

describe('DeleteOrdenService', () => {
  let service: DeleteOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
