import { TestBed } from '@angular/core/testing';

import { RemoveMenuService } from './remove-menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('RemoveMenuService', () => {
  let service: RemoveMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule], 
    });
    service = TestBed.inject(RemoveMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
