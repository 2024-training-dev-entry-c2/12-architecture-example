import { TestBed } from '@angular/core/testing';

import { DeleteDishService } from './delete-dish.service';

describe('DeleteDishService', () => {
  let service: DeleteDishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteDishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
