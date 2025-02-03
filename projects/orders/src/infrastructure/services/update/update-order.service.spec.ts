import { TestBed } from '@angular/core/testing';

import { UpdateOrderService } from './update-order.service';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateOrderService', () => {
  let service: UpdateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [HttpClientModule]
      
    });
    service = TestBed.inject(UpdateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
