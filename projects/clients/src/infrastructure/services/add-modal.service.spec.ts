import { TestBed } from '@angular/core/testing';

import { AddModalService } from './add-modal.service';

describe('AddModalService', () => {
  let service: AddModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
