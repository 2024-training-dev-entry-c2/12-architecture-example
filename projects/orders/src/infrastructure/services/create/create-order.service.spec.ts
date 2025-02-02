import { TestBed } from '@angular/core/testing';

import { CreateOrderService } from './create-order.service';
import { HttpClientModule } from '@angular/common/http';

describe('CreateOrderService', () => {
  let service: CreateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CreateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
