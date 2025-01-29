import { TestBed } from '@angular/core/testing';

import { UpdateFormService } from './update-form.service';

describe('UpdateFormService', () => {
  let service: UpdateFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
