import { TestBed } from '@angular/core/testing';

import { GetMenusService } from './get-menus.service';

describe('GetMenusService', () => {
  let service: GetMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
