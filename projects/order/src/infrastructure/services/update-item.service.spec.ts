import { TestBed } from '@angular/core/testing';

import { UpdateItemService } from './update-item.service';

describe('UpdateItemService', () => {
  let service: UpdateItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
