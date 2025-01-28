import { TestBed } from '@angular/core/testing';

import { EditClientService } from './edit-client.service';

describe('EditClientService', () => {
  let service: EditClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
