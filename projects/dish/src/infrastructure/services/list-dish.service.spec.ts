import { TestBed } from '@angular/core/testing';

import { ListDishService } from './list-dish.service';

describe('ListDishService', () => {
  let service: ListDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
