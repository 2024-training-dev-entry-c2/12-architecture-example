import { TestBed } from '@angular/core/testing';

import { ListMenusService } from './list-menus.service';

describe('ListMenusService', () => {
  let service: ListMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
