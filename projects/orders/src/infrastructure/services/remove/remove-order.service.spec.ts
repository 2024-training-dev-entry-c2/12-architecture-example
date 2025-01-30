import { TestBed } from '@angular/core/testing';

import { RemoveOrderService } from './remove-order.service';

describe('RemoveOrderService', () => {
  let service: RemoveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
