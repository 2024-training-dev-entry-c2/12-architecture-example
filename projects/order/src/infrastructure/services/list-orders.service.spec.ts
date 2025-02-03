import { TestBed } from '@angular/core/testing';

import { ListOrdersService } from './list-orders.service';

describe('ListOrdersService', () => {
  let service: ListOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
