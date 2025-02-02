import { TestBed } from '@angular/core/testing';

import { GetOrderService } from './get-order.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetOrderService', () => {
  let service: GetOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [HttpClientModule]
      
    });
    service = TestBed.inject(GetOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
