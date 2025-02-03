import { TestBed } from '@angular/core/testing';

import { CreateOrdenService } from './create-orden.service';

describe('CreateOrdenService', () => {
  let service: CreateOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
