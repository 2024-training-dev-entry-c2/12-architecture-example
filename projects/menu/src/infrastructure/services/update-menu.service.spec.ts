import { TestBed } from '@angular/core/testing';

import { UpdateMenuService } from './update-menu.service';

describe('UpdateMenuService', () => {
  let service: UpdateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
