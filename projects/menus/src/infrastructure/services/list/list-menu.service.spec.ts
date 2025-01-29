import { TestBed } from '@angular/core/testing';

import { ListMenuService } from './list-menu.service';

describe('ListMenuService', () => {
  let service: ListMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
