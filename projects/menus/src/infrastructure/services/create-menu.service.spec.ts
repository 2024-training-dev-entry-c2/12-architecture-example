import { TestBed } from '@angular/core/testing';

import { CreateMenuService } from './create-menu.service';

describe('CreateMenuService', () => {
  let service: CreateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
