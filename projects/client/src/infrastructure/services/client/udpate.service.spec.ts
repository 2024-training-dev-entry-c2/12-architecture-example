import { TestBed } from '@angular/core/testing';

import { UdpateService } from './udpate.service';

describe('UdpateService', () => {
  let service: UdpateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UdpateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
