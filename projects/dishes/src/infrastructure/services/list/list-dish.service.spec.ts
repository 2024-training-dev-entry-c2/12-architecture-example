import { TestBed } from '@angular/core/testing';

import { ListDishService } from './list-dish.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListDishService', () => {
  let service: ListDishService;

  beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientModule] // ✅ Agrega HttpClientModule aquí
        });
    service = TestBed.inject(ListDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
