import { TestBed } from '@angular/core/testing';

import { EditDishService } from './edit-dish.service';

describe('EditDishService', () => {
  let service: EditDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
