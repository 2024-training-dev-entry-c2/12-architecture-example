import { TestBed } from '@angular/core/testing';

import { ListDishesService } from './list-dishes.service';

describe('ListDishesService', () => {
  let service: ListDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
