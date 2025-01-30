import { TestBed } from '@angular/core/testing';

import { ListOrderService } from './list-order.service';

describe('ListOrderService', () => {
  let service: ListOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
