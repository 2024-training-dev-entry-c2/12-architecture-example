import { TestBed } from '@angular/core/testing';

import { GetMenuService } from './get-menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetMenuService', () => {
  let service: GetMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule], 
    });
    service = TestBed.inject(GetMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
