import { TestBed } from '@angular/core/testing';

import { CreateDishService } from './create-dish.service';

describe('CreateDishService', () => {
  let service: CreateDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
