import { TestBed } from '@angular/core/testing';

import { GetNameService } from './get-name.service';

describe('GetMenuService', () => {
  let service: GetNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
