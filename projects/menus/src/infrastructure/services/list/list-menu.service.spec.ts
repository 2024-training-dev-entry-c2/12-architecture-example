import { TestBed } from '@angular/core/testing';

import { ListMenuService } from './list-menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListMenuService', () => {
  let service: ListMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule], 
    });
    service = TestBed.inject(ListMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
