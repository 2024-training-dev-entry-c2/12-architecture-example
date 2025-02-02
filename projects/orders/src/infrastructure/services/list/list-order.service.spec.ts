import { TestBed } from '@angular/core/testing';

import { ListOrderService } from './list-order.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListOrderService', () => {
  let service: ListOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [HttpClientModule]
      
    });
    service = TestBed.inject(ListOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
