import { TestBed } from '@angular/core/testing';

import { GetMenuService } from './get-menu.service';

describe('GetMenuService', () => {
  let service: GetMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
