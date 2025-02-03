import { TestBed } from '@angular/core/testing';

import { UpdateDishService } from './update-dish.service';

describe('UpdateDishService', () => {
  let service: UpdateDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
