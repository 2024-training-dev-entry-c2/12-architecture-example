import { TestBed } from '@angular/core/testing';

import { CreateMenuService } from './create-menu.service';
import { HttpClientModule } from '@angular/common/http';

describe('CreateMenuService', () => {
  let service: CreateMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [HttpClientModule], 
    });
    
    service = TestBed.inject(CreateMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
