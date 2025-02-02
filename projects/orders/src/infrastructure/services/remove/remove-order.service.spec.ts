import { TestBed } from '@angular/core/testing';

import { RemoveOrderService } from './remove-order.service';
import { HttpClientModule } from '@angular/common/http';

describe('RemoveOrderService', () => {
  let service: RemoveOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [HttpClientModule]
      
    });
    service = TestBed.inject(RemoveOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
