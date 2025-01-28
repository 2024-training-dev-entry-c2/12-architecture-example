import { TestBed } from '@angular/core/testing';

import { EditOrderService } from './edit-order.service';

describe('EditOrderService', () => {
  let service: EditOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
