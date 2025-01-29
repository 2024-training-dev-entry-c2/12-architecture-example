import { TestBed } from '@angular/core/testing';

import { ListClientService } from './list-client.service';

describe('ListClientService', () => {
  let service: ListClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
