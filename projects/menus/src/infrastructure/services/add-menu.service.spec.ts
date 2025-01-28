import { TestBed } from '@angular/core/testing';

import { AddMenuService } from './add-menu.service';

describe('AddMenuService', () => {
  let service: AddMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
