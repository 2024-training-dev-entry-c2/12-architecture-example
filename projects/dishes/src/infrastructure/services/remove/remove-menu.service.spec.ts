import { TestBed } from '@angular/core/testing';

import { RemoveMenuService } from './remove-menu.service';

describe('RemoveMenuService', () => {
  let service: RemoveMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
