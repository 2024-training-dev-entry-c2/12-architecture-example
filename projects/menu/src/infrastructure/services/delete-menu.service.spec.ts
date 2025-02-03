import { TestBed } from '@angular/core/testing';

import { DeleteMenuService } from './delete-menu.service';

describe('DeleteMenuService', () => {
  let service: DeleteMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
