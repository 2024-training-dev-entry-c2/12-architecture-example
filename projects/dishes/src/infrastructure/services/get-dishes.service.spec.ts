import { TestBed } from '@angular/core/testing';

import { GetDishesService } from './get-dishes.service';

describe('GetDishesService', () => {
  let service: GetDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
