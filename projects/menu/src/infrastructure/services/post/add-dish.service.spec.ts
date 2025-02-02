import { TestBed } from '@angular/core/testing';

import { AddDishService } from './add-dish.service';

describe('AddDishService', () => {
  let service: AddDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
