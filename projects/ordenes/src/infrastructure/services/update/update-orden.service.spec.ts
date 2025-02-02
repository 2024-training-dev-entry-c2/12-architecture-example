import { TestBed } from '@angular/core/testing';

import { UpdateOrdenService } from './update-orden.service';

describe('UpdateOrdenService', () => {
  let service: UpdateOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
