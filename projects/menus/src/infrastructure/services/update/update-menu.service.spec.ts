import { TestBed } from '@angular/core/testing';

import { UpdateMenuService } from './update-menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('UpdateMenuService', () => {
  let service: UpdateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule], 
    });
    service = TestBed.inject(UpdateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
